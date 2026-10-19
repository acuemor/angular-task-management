import { Routes } from '@angular/router';
import { TaskList } from './features/tasks/pages/task-list/task-list';
import { Home } from './features/home/pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'tasks',
    component: TaskList
  }
];
