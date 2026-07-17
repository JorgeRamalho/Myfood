import { Controller, Get, Param, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('q') q?: string,
  ) {
    return {
      data: this.restaurantsService.findAll(category, q),
    };
  }

  @Get('featured')
  findFeatured() {
    return {
      data: this.restaurantsService.findFeatured(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return {
      data: this.restaurantsService.findOne(id),
    };
  }
}
