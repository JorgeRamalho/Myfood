import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  guestSession() {
    return {
      user: {
        id: 'guest',
        name: 'Convidado MyFood',
        role: 'customer',
      },
      accessToken: 'demo-guest-token',
      expiresIn: '7d',
    };
  }
}
