import { Component, input, output } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  imports: [],
  selector: 'app-task-item',
  styleUrl: './task-item.scss',
  templateUrl: './task-item.html',
})
export class TaskItem {
  task = input.required<Task>();
  toggleEvent = output<number>();
  deleteEvent = output<number>();

  protected onToggleState(): void {
    this.toggleEvent.emit(this.task().id);
  }

  protected onDelete(): void {
    this.deleteEvent.emit(this.task().id);
  }
}
