import { TestBed } from '@angular/core/testing';

import { RoomTypeServices } from './room-type-services';

describe('RoomTypeServices', () => {
  let service: RoomTypeServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomTypeServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
