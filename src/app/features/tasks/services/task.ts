import { Injectable, signal } from '@angular/core';
import type { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks = signal<Task[]>([
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
    },
  ]);

  public readonly tasks = this._tasks.asReadonly();

  public toggleTask(id: number): void {
    this._tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  public addTask(title: string): void {
    this._tasks.update(tasks => [
      ...tasks,
      {
        id: Math.max(0, ...tasks.map(task => task.id)) + 1,
        title,
        completed: false,
      },
    ]);
  }

}
