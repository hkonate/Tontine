import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dtos/auth.signup.dto';
import { SignInDTO } from './dtos/auth.signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() body: SignUpDTO): Promise<string> {
    return this.authService.signup(body);
  }
  @Post('/signin')
  signIn(@Body() body: SignInDTO): Promise<string> {
    return this.authService.signin(body);
  }
}
