import {
  Controller,
  Get,
  Body,
  UseGuards,
  Param,
  ParseUUIDPipe,
  ParseFloatPipe,
  Put,
} from '@nestjs/common';
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

  @Get('/:id')
  getUser(@Param('id', ParseUUIDPipe) id: string): Promise<GetUsersReturnDto> {
    return this.userService.getUser(id);
  }

  @Put('/:id')
  updateRating(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('rating', ParseFloatPipe) rating: number,
  ) {
    return this.userService.updateRating(id, rating);
  }
}
