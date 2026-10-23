import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

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
        Validators.minLength(3)
      ],
    }),
  });

  protected onCreateTask(): void {
    debugger;
    if (this.taskForm.invalid) {
      return;
    }

    const trimmedTitle = this.taskForm.controls.title.value.trim();

    if (!trimmedTitle) {
      return;
    }

    this.taskCreatedEvent.emit(trimmedTitle);
    this.taskForm.reset();
  }
}
