import { Test, TestingModule } from '@nestjs/testing';
import { ServiceTracking } from './Tracking.service';

describe('Service', () => {
  let service: ServiceTracking;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceTracking],
    }).compile();

    service = module.get<ServiceTracking>(ServiceTracking);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
