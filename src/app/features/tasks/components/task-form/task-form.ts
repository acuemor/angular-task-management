import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.scss',
  templateUrl: './task-form.html',
})
export class TaskForm {
  taskCreatedEvent = output<string>();

  protected onCreateTask(taskTitleInputElement: HTMLInputElement): void {
    const trimmedTitle = taskTitleInputElement.value.trim();
    if (!trimmedTitle) {
      return;
    }
    taskTitleInputElement.value = '';
    this.taskCreatedEvent.emit(trimmedTitle);
  }
}
