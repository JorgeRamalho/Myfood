import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { AuthUser } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return {
      data: await this.authService.register(dto),
      message: 'Conta criada com sucesso',
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return {
      data: await this.authService.login(dto),
      message: 'Login realizado',
    };
  }

  @Post('guest')
  async guest() {
    return {
      data: await this.authService.guestSession(),
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@Req() req: { user: AuthUser }) {
    return {
      data: await this.authService.me(req.user.id),
    };
  }
}
