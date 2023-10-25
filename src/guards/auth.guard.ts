import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

export class UserPayloadType {
  name: string;
  id: string;
  iat: number;
  exp: number;
}
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const token = request?.headers?.authorization?.split('Bearer ')[1];

    if (!token) return false;

    const userPayload = jwt.decode(token) as UserPayloadType;

    if (!userPayload) return false;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userPayload.id,
      },
    });

    if (!user) return false;

    return true;
  }
}
