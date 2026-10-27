import { Component, output } from '@angular/core';
import { ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

function noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
  return  typeof control.value === 'string' && control.value.trim().length === 0 ? { whitespace: true } : null;
}

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
})
export class TaskForm {
  taskCreatedEvent = output<string>();

  taskForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        noWhitespaceValidator
      ],
    }),
  });

  protected readonly titleControl = this.taskForm.controls.title;

  protected onCreateTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const trimmedTitle = this.titleControl.value.trim();

    this.taskCreatedEvent.emit(trimmedTitle);
    this.taskForm.reset();
  }
}
