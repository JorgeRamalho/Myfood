import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('restaurants/:restaurantId/menu')
  async findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return {
      data: await this.menuService.findByRestaurant(restaurantId),
    };
  }

  @Get('menu/:id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.menuService.findOne(id),
    };
  }
}
