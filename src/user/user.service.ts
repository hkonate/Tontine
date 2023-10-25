import { Injectable } from '@nestjs/common';
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

  getUser() {
    return '';
  }
}
