import { Test, TestingModule } from '@nestjs/testing';
import { ColisController } from './colis.controller';

describe('ControllersController', () => {
  let controller: ColisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ColisController],
    }).compile();

    controller = module.get<ColisController>(ColisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
