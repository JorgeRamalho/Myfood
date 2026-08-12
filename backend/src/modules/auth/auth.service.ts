import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

const EXPIRES_IN = '7d';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  private toPublicUser(user: {
    id: string;
    name: string;
    email: string | null;
    role: string;
    restaurantId: string | null;
  }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      restaurantId: user.restaurantId,
    };
  }

  private async signSession(user: {
    id: string;
    name: string;
    email: string | null;
    role: string;
    restaurantId: string | null;
  }) {
    const accessToken = await this.jwt.signAsync(
      { sub: user.id, role: user.role },
      { expiresIn: EXPIRES_IN },
    );
    return {
      user: this.toPublicUser(user),
      accessToken,
      expiresIn: EXPIRES_IN,
    };
  }

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        id: `usr_${randomUUID().slice(0, 8)}`,
        name: dto.name.trim(),
        email,
        passwordHash,
        role: 'customer',
        restaurantId: null,
      },
    });

    return this.signSession(user);
  }

  async login(dto: LoginDto) {
    const email = dto.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    return this.signSession(user);
  }

  async guestSession() {
    const user = await this.prisma.user.upsert({
      where: { id: 'guest' },
      update: {},
      create: {
        id: 'guest',
        name: 'Convidado MyFood',
        role: 'customer',
      },
    });

    return this.signSession(user);
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('Sessão inválida');
    }
    return this.toPublicUser(user);
  }
}
