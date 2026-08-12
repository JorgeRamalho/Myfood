import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('q') q?: string,
  ) {
    return {
      data: await this.restaurantsService.findAll(category, q),
    };
  }

  @Get('featured')
  async findFeatured() {
    return {
      data: await this.restaurantsService.findFeatured(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.restaurantsService.findOne(id),
    };
  }
}
