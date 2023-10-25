import {
  Controller,
  Get,
  UseGuards,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard, UserPayloadType } from 'src/guards/auth.guard';
import { UserService } from './user.service';
import { GetUsersReturnDto } from './dtos/user.getUsers.dtos';
import { User } from 'src/decorators/user.decorator';
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUsers(): Promise<GetUsersReturnDto[]> {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<GetUsersReturnDto> {
    return this.userService.getUser(id);
  }
}
