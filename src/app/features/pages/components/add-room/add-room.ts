
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { RoomTypeServices } from '../../../../core/services/roomtypes/room-type-services';
import { Roomtypes, Types } from '../../../../shared/models/roomTypes/roomtypes';
import { AddRoomServices } from '../../../../core/services/add-room/add-room-services';


/** Strongly-typed shape of the add-room form values. */
export interface AddRoomFormValue {
  roomNumber: number;
  roomType: string;
  price: number;
  roomCapacity: number;
}
@Component({
  selector: 'app-add-room',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-room.html',
  styleUrl: './add-room.css',
})
export class AddRoom {
  private readonly fb = inject(FormBuilder);

  readonly isLoading = signal<boolean>(false);
  readonly formError = signal<string>('');
  readonly successMessage = signal<string>('');

  /** عدّلي القيم دي حسب أنواع الغرف الحقيقية عندكم في قاعدة البيانات. */
  roomTypeOptions: WritableSignal<Roomtypes[]>=signal<Roomtypes[]>([]);
  private readonly roomTypeServices=inject(RoomTypeServices);
  private readonly roomServices=inject(AddRoomServices);
  roomtypes():void{
    this.roomTypeServices.getroomtypes().subscribe({
      next:(res)=>{
        console.log(res);
        this.roomTypeOptions.set(res);
      },error:(err)=>{

      }
    })
  }
  readonly addRoomForm: FormGroup;

  constructor() {
    this.addRoomForm = this.fb.nonNullable.group({
      roomNumber: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(1)]),
      roomType: this.fb.nonNullable.control<string>('', [Validators.required]),
      price: this.fb.nonNullable.control<number>(0, [Validators.required, Validators.min(1)]),
      roomCapacity: this.fb.nonNullable.control<number>(1, [Validators.required, Validators.min(1)]),
    });
  }
  ngOnInit(): void {
    this.roomtypes();
  }

  readonly roomNumberErrorMessage = computed(() => '');

  /** True only once the control is invalid AND the user has interacted with it. */
  isInvalid(controlName: keyof AddRoomFormValue): boolean {
    const control: AbstractControl | null = this.addRoomForm.get(controlName as string);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  errorMessage(controlName: keyof AddRoomFormValue, label: string): string {
    const control = this.addRoomForm.get(controlName as string);
    if (!control?.errors) return '';
    if (control.errors['required']) return `${label} is required.`;
    if (control.errors['min']) return `${label} must be greater than 0.`;
    return `Invalid ${label.toLowerCase()}.`;
  }

  onSubmit(): void {
    this.formError.set('');
    this.successMessage.set('');

    if (this.addRoomForm.invalid) {
      this.addRoomForm.markAllAsTouched();
      return;
    }

    const payload: AddRoomFormValue = this.addRoomForm.getRawValue();
    this.isLoading.set(true);

    this.roomServices.addrooms(payload).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(`Room ${payload.roomNumber} added successfully.`);
        this.addRoomForm.reset({
          roomNumber: 0,
          roomType: '',
          price: 0,
          roomCapacity: 1,
        });
      },
      error: (err) => {
        this.isLoading.set(false);
        console.log(err);
        this.formError.set(err.error?.err?.message ?? err.error?.message ?? 'Failed to add room. Please try again.');
      },
    });
  }
}
