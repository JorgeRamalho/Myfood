import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      service: 'MyFood API',
      status: 'ok',
      version: '0.1.0',
      message: 'O sabor que vem até você.',
    };
  }
}
