import { Injectable, HttpException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersReturnDto } from './dtos/user.getUsers.dtos';
import { userSelect } from './selectors/user.selectors';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getUsers(): Promise<GetUsersReturnDto[]> {
    return this.prismaService.user.findMany({
      select: {
        ...userSelect,
      },
    });
  }

  async getUser(id: string): Promise<GetUsersReturnDto> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        ...userSelect,
      },
    });
    if (!user) {
      throw new HttpException('Indentifiants invalides', 400);
    }
    return user;
  }

  async updateRating(usersId: string[]) {
    const users = await this.prismaService.user.findMany({
      where: {
        id: {
          in: usersId,
        },
      },
      select: {
        id: true,
        rating: true,
        penalityRate: true,
      },
    });
    const penalities = await this.prismaService.payment.findMany({
      where: {
        id: {
          in: usersId,
        },
        penality: true,
      },
    });

    const nbrOfpenalities = users.reduce((acc, user) => {
      acc[user.id] = penalities.filter(
        (payment) => payment.userId === user.id,
      ).length;
      return acc;
    }, {});

    const updates = users.map((user) => ({
      where: { id: user.id },
      data: {
        rating: user.rating - nbrOfpenalities[user.id],
        penalityRate: user.penalityRate + 1,
      },
    }));

    const updatesUsers = await this.prismaService.user.updateMany({
      data: updates,
    });

    console.log('return Update', updatesUsers);
    return updatesUsers;
  }

  async deleteUser(id: string) {
    const tontines = await this.prismaService.tontine.findMany({
      where: {
        attendee: {
          some: { id },
        },
        done: false,
      },
    });
    if (tontines.length > 0) {
      throw new ForbiddenException('Tontine en cours.');
    }
    const userToDelete = await this.prismaService.user.delete({
      where: { id },
      select: { ...userSelect },
    });
    if (!userToDelete) throw new HttpException('Indentifiants invalides', 400);
    return userToDelete;
  }
}
