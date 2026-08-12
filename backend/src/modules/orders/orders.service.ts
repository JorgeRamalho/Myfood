import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import type { AuthUser } from '../auth/jwt.strategy';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private mapOrder(order: {
    id: string;
    userId: string;
    restaurantId: string;
    restaurantName: string;
    total: number;
    status: string;
    createdAt: Date;
    items: Array<{
      menuItemId: string;
      name: string;
      quantity: number;
      price: number;
    }>;
  }) {
    return {
      id: order.id,
      userId: order.userId,
      restaurantId: order.restaurantId,
      restaurantName: order.restaurantName,
      items: order.items.map((item) => ({
        menuItemId: item.menuItemId,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: order.total,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    };
  }

  async findAllForUser(userId: string) {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map((order) => this.mapOrder(order));
  }

  async findManaged(actor: AuthUser) {
    if (actor.role === 'admin') {
      const orders = await this.prisma.order.findMany({
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
      return orders.map((order) => this.mapOrder(order));
    }

    if (actor.role === 'restaurant' && actor.restaurantId) {
      const orders = await this.prisma.order.findMany({
        where: { restaurantId: actor.restaurantId },
        include: { items: true },
        orderBy: { createdAt: 'desc' },
      });
      return orders.map((order) => this.mapOrder(order));
    }

    throw new ForbiddenException('Sem permissão para gerenciar pedidos');
  }

  async findOne(id: string, actor: AuthUser) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) {
      throw new NotFoundException(`Pedido ${id} não encontrado`);
    }

    const isOwner = order.userId === actor.id;
    const isRestaurant =
      actor.role === 'restaurant' && actor.restaurantId === order.restaurantId;
    const isAdmin = actor.role === 'admin';
    if (!isOwner && !isRestaurant && !isAdmin) {
      throw new ForbiddenException('Pedido de outro usuário');
    }
    return this.mapOrder(order);
  }

  async create(dto: CreateOrderDto, userId: string) {
    await this.prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: userId === 'guest' ? 'Convidado MyFood' : 'Cliente MyFood',
        role: 'customer',
      },
    });

    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id: dto.restaurantId },
    });
    if (!restaurant) {
      throw new NotFoundException(
        `Restaurante ${dto.restaurantId} não encontrado`,
      );
    }

    const subtotal = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const total = Number((subtotal + 5.9).toFixed(2));
    const orderId = `MF-${randomUUID().slice(0, 5).toUpperCase()}`;

    const order = await this.prisma.order.create({
      data: {
        id: orderId,
        userId,
        restaurantId: dto.restaurantId,
        restaurantName: dto.restaurantName,
        total,
        status: 'preparando',
        items: {
          create: dto.items.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    });

    return this.mapOrder(order);
  }

  async updateStatus(
    id: string,
    dto: UpdateOrderStatusDto,
    actor: AuthUser,
  ) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Pedido ${id} não encontrado`);
    }

    const isRestaurant =
      actor.role === 'restaurant' && actor.restaurantId === order.restaurantId;
    const isAdmin = actor.role === 'admin';
    if (!isRestaurant && !isAdmin) {
      throw new ForbiddenException('Sem permissão para alterar status');
    }

    const updated = await this.prisma.order.update({
      where: { id },
      data: { status: dto.status as OrderStatus },
      include: { items: true },
    });
    return this.mapOrder(updated);
  }
}
