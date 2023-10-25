import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { SignUpParamsDTO } from './dtos/auth.signup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcript from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({
    firstname,
    lastname,
    email,
    password,
  }: SignUpParamsDTO): Promise<string> {
    if (await this.userExist(email)) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    try {
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
    } catch (error) {
      throw new HttpException(
        "Erreur lors de l'enregistrement de l'utilisateur. Veuillez réessayer ultérieurement.",
        400,
      );
    }
  }

  async signin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const user = await this.userExist(email);
    if (!user) {
      throw new HttpException('Identifiants invalides', 400);
    }
    const match = await bcript.compare(password, user.password);
    if (!match) {
      throw new HttpException('Identifiants invalides', 400);
    }
    return this.generateToken(email, user.id);
  }

  private generateToken(name: string, id: string) {
    return jwt.sign({ name, id }, process.env.JSON_WEB_KEY, {
      expiresIn: 3600000,
    });
  }
  private async userExist(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
