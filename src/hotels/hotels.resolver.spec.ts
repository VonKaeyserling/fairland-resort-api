import { Test, TestingModule } from '@nestjs/testing';
import { HotelsResolver } from './hotels.resolver';
import { HotelsService } from './hotels.service';

describe('HotelsResolver', () => {
  let resolver: HotelsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelsResolver, HotelsService],
    }).compile();

    resolver = module.get<HotelsResolver>(HotelsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
