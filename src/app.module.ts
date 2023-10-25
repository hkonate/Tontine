import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TontineModule } from './tontine/tontine.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Module({
  imports: [PrismaModule, UserModule, TontineModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
  ],
})
export class AppModule {}
