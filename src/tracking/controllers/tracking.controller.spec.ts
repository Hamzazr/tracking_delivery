import { Test, TestingModule } from '@nestjs/testing';
import { ControllerTracking } from './tracking.controller';

describe('Controller', () => {
  let controller: ControllerTracking;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControllerTracking],
    }).compile();

    controller = module.get<ControllerTracking>(ControllerTracking);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
