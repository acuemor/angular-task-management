import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TaskItem } from '../../components/task-item/task-item';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskService } from '../../services/task';

@Component({
  imports: [TaskItem, TaskForm],
  selector: 'app-task-list',
  styleUrl: './task-list.scss',
  templateUrl: './task-list.html',
})
export class TaskList implements OnInit, OnDestroy {
  ngOnInit(): void {
    console.log('TaskList initialized');
  }

  ngOnDestroy(): void {
    console.log('TaskList destroyed');
  }
  protected readonly taskService = inject(TaskService);
}
