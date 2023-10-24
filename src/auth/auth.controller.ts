import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  signUp() {
    return this.authService.signup();
  }
  @Post()
  signIn() {
    return this.authService.signin();
  }
}
