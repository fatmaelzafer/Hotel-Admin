import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomType } from './add-room-type';

describe('AddRoomType', () => {
  let component: AddRoomType;
  let fixture: ComponentFixture<AddRoomType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRoomType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRoomType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
