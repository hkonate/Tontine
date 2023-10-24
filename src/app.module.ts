import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TontineModule } from './tontine/tontine.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, UserModule, TontineModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
