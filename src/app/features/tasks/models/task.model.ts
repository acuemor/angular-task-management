import { delay, map, of } from 'rxjs';


export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks$ = of<Task[]>([
  { id: 1, title: 'Aprender signals', completed: false },
  { id: 2, title: 'Configurar el router', completed: true },
  { id: 3, title: 'Crear el modelo Task', completed: true },
]).pipe(
  delay(1000),
);

const completedTasks$ = tasks$.pipe(
  map(tasks => tasks.filter(task => task.completed)),
);

completedTasks$.subscribe(tasks => {
  console.log('Resultado:', tasks);
});

