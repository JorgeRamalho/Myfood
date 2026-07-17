import { Controller, Get, Param } from '@nestjs/common';
import { MenuService } from './menu.service';

@Controller()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('restaurants/:restaurantId/menu')
  findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return {
      data: this.menuService.findByRestaurant(restaurantId),
    };
  }

  @Get('menu/:id')
  findOne(@Param('id') id: string) {
    return {
      data: this.menuService.findOne(id),
    };
  }
}
