import { Component, signal } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  imports: [],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList {
  protected readonly tasks = signal<Task[]>([
    {
      id: 1,
      title: 'Aprender signals',
      completed: false,
    },
    {
      id: 2,
      title: 'Configurar el router',
      completed: true,
    },
    {
      id: 3,
      title: 'Crear el modelo Task',
      completed: false,
    }
  ]);

  protected toggleTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
}
