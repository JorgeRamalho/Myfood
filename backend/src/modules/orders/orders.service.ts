import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { orders, type Order } from '../../data/seed';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  findAll(userId = 'guest') {
    return orders.filter((order) => order.userId === userId);
  }

  findOne(id: string) {
    const order = orders.find((item) => item.id === id);
    if (!order) {
      throw new NotFoundException(`Pedido ${id} não encontrado`);
    }
    return order;
  }

  create(dto: CreateOrderDto, userId = 'guest'): Order {
    const total = dto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const order: Order = {
      id: `MF-${randomUUID().slice(0, 5).toUpperCase()}`,
      userId,
      restaurantId: dto.restaurantId,
      restaurantName: dto.restaurantName,
      items: dto.items,
      total: Number((total + 5.9).toFixed(2)),
      status: 'preparando',
      createdAt: new Date().toISOString(),
    };

    orders.unshift(order);
    return order;
  }
}
