import { Module } from '@nestjs/common';
import { TontineController } from './tontine.controller';
import { TontineService } from './tontine.service';

@Module({
  controllers: [TontineController],
  providers: [TontineService]
})
export class TontineModule {}
