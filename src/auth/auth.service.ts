import { Injectable, ConflictException } from '@nestjs/common';
import { SignUpParamsDTO } from './dtos/auth.signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcript from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({ firstname, lastname, email, password }: SignUpParamsDTO) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException();
    }

    const hashedPassword = await bcript.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    const newUser = await this.prismaService.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
      },
    });

    return this.generateToken(newUser.firstname, newUser.id);
  }

  async signin() {}

  private generateToken(name: string, id: string) {
    return jwt.sign({ name, id }, process.env.JSON_WEB_KEY, {
      expiresIn: 3600000,
    });
  }
}
