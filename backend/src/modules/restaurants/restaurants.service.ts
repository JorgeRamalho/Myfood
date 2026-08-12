import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(category?: string, q?: string) {
    const restaurants = await this.prisma.restaurant.findMany({
      orderBy: { name: 'asc' },
    });

    return restaurants.filter((restaurant) => {
      const matchesCategory =
        !category || restaurant.categories.includes(category);
      const haystack = `${restaurant.name} ${restaurant.cuisine}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }

  async findFeatured() {
    return this.prisma.restaurant.findMany({
      where: { featured: true },
      orderBy: { rating: 'desc' },
    });
  }

  async findOne(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({
      where: { id },
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurante ${id} não encontrado`);
    }
    return restaurant;
  }
}
