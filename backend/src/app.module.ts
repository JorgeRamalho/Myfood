import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MenuModule } from './modules/menu/menu.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';

@Module({
  imports: [AuthModule, RestaurantsModule, MenuModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
