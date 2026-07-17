import { Injectable, NotFoundException } from '@nestjs/common';
import { restaurants } from '../../data/seed';

@Injectable()
export class RestaurantsService {
  findAll(category?: string, q?: string) {
    return restaurants.filter((restaurant) => {
      const matchesCategory =
        !category || restaurant.categories.includes(category);
      const haystack = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }

  findFeatured() {
    return restaurants.filter((restaurant) => restaurant.featured);
  }

  findOne(id: string) {
    const restaurant = restaurants.find((item) => item.id === id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurante ${id} não encontrado`);
    }
    return restaurant;
  }
}
