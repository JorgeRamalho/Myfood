import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import type { AuthUser } from '../auth/jwt.strategy';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Req() req: { user: AuthUser }) {
    return {
      data: await this.ordersService.findAllForUser(req.user.id),
    };
  }

  @Get('manage')
  @UseGuards(RolesGuard)
  @Roles('restaurant', 'admin')
  async findManaged(@Req() req: { user: AuthUser }) {
    return {
      data: await this.ordersService.findManaged(req.user),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: { user: AuthUser }) {
    return {
      data: await this.ordersService.findOne(id, req.user),
    };
  }

  @Post()
  async create(
    @Body() dto: CreateOrderDto,
    @Req() req: { user: AuthUser },
  ) {
    return {
      data: await this.ordersService.create(dto, req.user.id),
      message: 'Pedido criado com sucesso',
    };
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('restaurant', 'admin')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateOrderStatusDto,
    @Req() req: { user: AuthUser },
  ) {
    return {
      data: await this.ordersService.updateStatus(id, dto, req.user),
      message: 'Status atualizado',
    };
  }
}
