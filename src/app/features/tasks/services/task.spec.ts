import { TestBed } from '@angular/core/testing';
import { TaskService } from './task';

describe('TaskService', () => {
  beforeEach(() => {
    localStorage.removeItem('tasks');
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    localStorage.removeItem('tasks');
  });

  it('should be created', () => {
    const service = TestBed.inject(TaskService);

    expect(service).toBeTruthy();
  });

  it('should load tasks from localStorage', () => {
    const storedTasks = [{ id: 4, title: 'Tarea guardada', completed: false }];
    localStorage.setItem('tasks', JSON.stringify(storedTasks));

    const service = TestBed.inject(TaskService);
    TestBed.flushEffects();

    expect(service.tasks()).toEqual(storedTasks);
  });

  it('should use the default tasks when localStorage is empty', () => {
    const service = TestBed.inject(TaskService);
    TestBed.flushEffects();

    expect(service.tasks()).toEqual([
      { id: 1, title: 'Aprender signals', completed: false },
      { id: 2, title: 'Configurar el router', completed: true },
      { id: 3, title: 'Crear el modelo Task', completed: false },
    ]);
  });

  it('should use the default tasks when localStorage contains invalid JSON', () => {
    localStorage.setItem('tasks', '{invalid json');

    const service = TestBed.inject(TaskService);
    TestBed.flushEffects();

    expect(service.tasks()).toEqual([
      { id: 1, title: 'Aprender signals', completed: false },
      { id: 2, title: 'Configurar el router', completed: true },
      { id: 3, title: 'Crear el modelo Task', completed: false },
    ]);
  });
});
