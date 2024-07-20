import { TestBed } from '@automock/jest';

import { HotelsResolver } from './hotels.resolver';

import { HotelsService } from './hotels.service';

describe('HotelsResolver', () => {
  let resolver: HotelsResolver;
  let service: HotelsService;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(HotelsResolver).compile();

    resolver = unit;
    service = unitRef.get(HotelsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });
});
