import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dtos/auth.signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() body: SignUpDTO) {
    return this.authService.signup(body);
  }
  @Post()
  signIn() {
    return this.authService.signin();
  }
}
