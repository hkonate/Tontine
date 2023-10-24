import { Test, TestingModule } from '@nestjs/testing';
import { TontineController } from './tontine.controller';

describe('TontineController', () => {
  let controller: TontineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TontineController],
    }).compile();

    controller = module.get<TontineController>(TontineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
