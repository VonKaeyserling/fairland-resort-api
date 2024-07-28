import { TestBed } from '@automock/jest';

import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';

describe('RoomsResolver', () => {
  let resolver: RoomsResolver;
  let service: jest.Mocked<RoomsService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(RoomsResolver).compile();

    resolver = unit;
    service = unitRef.get(RoomsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });
});
