import { Component, inject } from '@angular/core';
import { TaskItem } from '../../components/task-item/task-item';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskService } from '../../services/task';

@Component({
  imports: [TaskItem, TaskForm],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList {
  protected readonly taskService = inject(TaskService);
}
