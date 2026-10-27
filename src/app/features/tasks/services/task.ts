import { effect, computed, Injectable, signal } from '@angular/core';
import type { Task } from '../models/task.model';

const DEFAULT_TASKS: Task[] = [
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
];

function loadTasks(): Task[] {
  try {
    const storedTasks = window.localStorage.getItem('tasks');
    if (storedTasks === null) {
      return [...DEFAULT_TASKS];
    }
    const parsedTasks = JSON.parse(storedTasks) as Task[];
    if (Array.isArray(parsedTasks) && parsedTasks.every(task => 'id' in task && 'title' in task && 'completed' in task)) {
      return parsedTasks;
    }
    return [...DEFAULT_TASKS];
  } catch {
    return [...DEFAULT_TASKS];
  }
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks = signal<Task[]>(loadTasks());
  private readonly _persistTasks = effect(() => {
    window.localStorage.setItem(
      'tasks',
      JSON.stringify(this.tasks())
    );
  });



  public readonly tasks = this._tasks.asReadonly();
  public readonly pendingTasks = computed<Task[]>(() =>
    this.tasks().filter(task => !task.completed)
  );
  public readonly completedTasks = computed(() => this.tasks().filter(task => task.completed).length);

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

  public deleteTask(id: number): void {
    this._tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

}
