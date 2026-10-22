import { Routes } from '@angular/router';
import { TaskList } from './features/tasks/pages/task-list/task-list';
import { Home } from './features/home/pages/home/home';
import { RxjsPractice } from './features/tasks/pages/rxjs-practice/rxjs-practice';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'tasks',
    component: TaskList
  },
  {
    path: 'rxjs-practice',
    component: RxjsPractice
  }
];
