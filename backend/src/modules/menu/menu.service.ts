import { Injectable, NotFoundException } from '@nestjs/common';
import { menuItems } from '../../data/seed';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class MenuService {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  findByRestaurant(restaurantId: string) {
    this.restaurantsService.findOne(restaurantId);
    return menuItems.filter((item) => item.restaurantId === restaurantId);
  }

  findOne(id: string) {
    const item = menuItems.find((entry) => entry.id === id);
    if (!item) {
      throw new NotFoundException(`Item ${id} não encontrado`);
    }
    return item;
  }
}
