;
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, Location } from '@angular/common';
import { RoomTypeServices } from '../../../../core/services/roomtypes/room-type-services';
import { Roomtypes, typedata, Types } from '../../../../shared/models/roomTypes/roomtypes';


type AlertType = 'info' | 'success' | 'error';
@Component({
  selector: 'app-add-room-type',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './add-room-type.html',
  styleUrl: './add-room-type.css',
})
export class AddRoomType {
private fb = inject(FormBuilder);
  private service = inject(RoomTypeServices);
  private location = inject(Location);

  submitted = signal(false);
  loading = signal(false);
  alert = signal<{ type: AlertType; message: string } | null>(null);
  preview = signal<typedata | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    beds: ['', Validators.required],
    view: ['', Validators.required],
    area: ['', Validators.required],
    breakfast: ['No'],
    livingRoom: ['No'],
  });

  invalid(control: 'name' | 'beds' | 'view' | 'area') {
    return this.submitted() && this.form.controls[control].invalid;
  }

  submit() {
    this.submitted.set(true);
    if (this.form.invalid) return;

    const v = this.form.getRawValue();
    // نفس شكل الـ JSON اللي في Postman
    const payload: typedata = {
      name: v.name.trim(),
      roomAdvantages: {
        beds: v.beds.trim(),
        view: v.view.trim(),
        area: v.area.trim(),
        breakfast: v.breakfast,
        livingRoom: v.livingRoom,
      },
    };
    this.preview.set(payload);

    this.loading.set(true);
    this.alert.set({ type: 'info', message: 'Adding room type…' });

    this.service.addroomtypes(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.alert.set({ type: 'success', message: 'Room type added.' });
        this.form.reset({ breakfast: 'No', livingRoom: 'No' });
        this.submitted.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.alert.set({
          type: 'error',
          message: 'Could not add the room type: ' + (err.error?.message ?? err.message),
        });
      },
    });
  }

  back() {
    this.location.back();
  }
}
