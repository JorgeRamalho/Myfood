import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll() {
    return {
      data: this.ordersService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      data: this.ordersService.findOne(id),
    };
  }

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return {
      data: this.ordersService.create(dto),
      message: 'Pedido criado com sucesso',
    };
  }
}
