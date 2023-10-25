import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';
import { GetUsersReturnDto } from './dtos/user.getUsers.dtos';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): Promise<GetUsersReturnDto[]> {
    return this.userService.getUsers();
  }

  @Get()
  getUser() {
    return this.userService.getUser();
  }
}
