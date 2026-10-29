import { Component, signal, inject, DestroyRef, computed } from '@angular/core';
import { TaskSearch } from '../../components/task-search/task-search';
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, of, tap, catchError, throwError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from '../../models/task.model';
import { Todo } from '../../models/todo.model';
import { TodoApiService } from '../../services/todo-api';

@Component({
  imports: [TaskSearch],
  selector: 'app-rxjs-practice',
  styleUrl: './rxjs-practice.scss',
  templateUrl: './rxjs-practice.html',
})
export class RxjsPractice {
  protected readonly isLoading = signal(true);
  protected readonly errorMessage = signal<string | null>(null);
  private readonly todoApiService = inject(TodoApiService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      console.log('RxjsPractice destruido');
    });
  }

  // Coger las tareas desde un Observable mockeado

  // protected tasks$ = of<Task[]>([
  //   { id: 1, title: 'Aprender RxJS', completed: false },
  //   { id: 2, title: 'Practicar Angular', completed: true },
  //   { id: 3, title: 'Crear un servicio', completed: true },
  // ]).pipe(
  //   delay(1000),
  //   tap(() => this.isLoading.set(false)),
  //   catchError((error) => {
  //     this.errorMessage.set('Error al cargar las tareas: ' + error.message);
  //     this.isLoading.set(false);
  //     return of([]);
  //   })
  // );

  // Coger las tareas desde el servicio TodoApiService
  protected tasks$:  Observable<Todo[]> = this.todoApiService.getTodos().pipe(
    tap(() => this.isLoading.set(false)),
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        this.isLoading.set(false);
        this.errorMessage.set(
          `Error HTTP ${error.status}: no se pudieron cargar las tareas`,
        );
      } else {
        this.isLoading.set(false);
        this.errorMessage.set('Ha ocurrido un error inesperado');
      }
      return of([]);
    })
  );

  protected readonly tasks = toSignal(this.tasks$, { initialValue: [] as Todo[], });
  protected readonly searchTerm = signal('');
  protected readonly filteredTasks = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.tasks().filter(todo =>
      todo.title.toLowerCase().includes(term)
    );
  });

  protected onSearchTermChange(term: string): void {
    debugger;
    this.searchTerm.set(term);
  }

}


// Simulación de Error al cargar las tareas

// import { Component, signal } from '@angular/core';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { catchError, mergeMap, of, throwError, timer } from 'rxjs';
// import type { Task } from '../../models/task.model';

// @Component({
//   imports: [],
//   selector: 'app-rxjs-practice',
//   styleUrl: './rxjs-practice.scss',
//   templateUrl: './rxjs-practice.html',
// })
// export class RxjsPractice {
//   protected readonly isLoading = signal(true);
//   protected readonly errorMessage = signal<string | null>(null);

//   protected readonly tasks$ = timer(1000).pipe(
//     mergeMap(() =>
//       throwError(() => new Error('Error al cargar las tareas')),
//     ),
//     catchError((error: Error) => {
//       this.errorMessage.set(error.message);
//       this.isLoading.set(false);
//       return of([] as Task[]);
//     }),
//   );

//   protected readonly tasks = toSignal(this.tasks$, {
//     initialValue: [] as Task[],
//   });
// }
