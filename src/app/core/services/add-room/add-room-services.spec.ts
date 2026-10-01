import { TestBed } from '@angular/core/testing';

import { AddRoomServices } from './add-room-services';

describe('AddRoomServices', () => {
  let service: AddRoomServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRoomServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
