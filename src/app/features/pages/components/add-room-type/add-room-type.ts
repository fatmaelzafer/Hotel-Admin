import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { RoomTypeServices } from '../../../../core/services/roomtypes/room-type-services';

/** Strongly-typed shape of the room-advantages sub-object. */
export interface RoomAdvantages {
  beds: string;
  view: string;
  area: string;
  breakfast: string;
  livingRoom: string;
}

/** Strongly-typed shape of the add-room-type form values. */
export interface AddRoomTypeFormValue {
  name: string;
  beds: string;
  view: string;
  area: string;
  breakfast: string;
  livingRoom: string;
}

/** Payload sent to the backend, matching the nested roomAdvantages shape. */
export interface AddRoomTypePayload {
  name: string;
  roomAdvantages: RoomAdvantages;
}

export type AddRoomTypeForm = FormGroup<{
  name: FormControl<string>;
  beds: FormControl<string>;
  view: FormControl<string>;
  area: FormControl<string>;
  breakfast: FormControl<string>;
  livingRoom: FormControl<string>;
}>;

type AlertType = 'info' | 'success' | 'error';
@Component({
  selector: 'app-add-room-type',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-room-type.html',
  styleUrl: './add-room-type.css',
})
export class AddRoomType {
 private readonly fb = inject(FormBuilder);

  readonly isLoading = signal<boolean>(false);
  readonly formError = signal<string>('');
  readonly successMessage = signal<string>('');
  private readonly services=inject(RoomTypeServices);
  readonly addRoomTypeForm: FormGroup;

  constructor() {
    this.addRoomTypeForm = this.fb.nonNullable.group({
      name: this.fb.nonNullable.control<string>('', [Validators.required]),
      beds: this.fb.nonNullable.control<string>('', [Validators.required]),
      view: this.fb.nonNullable.control<string>('', [Validators.required]),
      area: this.fb.nonNullable.control<string>('', [Validators.required]),
      breakfast: this.fb.nonNullable.control<string>('', [Validators.required]),
      livingRoom: this.fb.nonNullable.control<string>('', [Validators.required]),
    });
  }

  /** True only once the control is invalid AND the user has interacted with it. */
  isInvalid(controlName: keyof AddRoomTypeFormValue): boolean {
    const control: AbstractControl | null = this.addRoomTypeForm.get(controlName as string);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  errorMessage(controlName: keyof AddRoomTypeFormValue, label: string): string {
    const control = this.addRoomTypeForm.get(controlName as string);
    if (!control?.errors) return '';
    if (control.errors['required']) return `${label} is required.`;
    return `Invalid ${label.toLowerCase()}.`;
  }


  onSubmit(): void {
    this.formError.set('');
    this.successMessage.set('');

    if (this.addRoomTypeForm.invalid) {
      this.addRoomTypeForm.markAllAsTouched();
      return;
    }

    const value: AddRoomTypeFormValue = this.addRoomTypeForm.getRawValue();
    const payload: AddRoomTypePayload = {
      name: value.name,
      roomAdvantages: {
        beds: value.beds,
        view: value.view,
        area: value.area,
        breakfast: value.breakfast,
        livingRoom: value.livingRoom,
      },
    };

    this.isLoading.set(true);

    this.services.addroomtypes(payload).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set(`Room type "${payload.name}" added successfully.`);
        this.addRoomTypeForm.reset({
          name: '',
          beds: '',
          view: '',
          area: '',
          breakfast: '',
          livingRoom: '',
        });
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
        this.formError.set(err.error?.err?.message ?? err.error?.message ?? 'Failed to add room type. Please try again.');
      },
    });
  }
}
