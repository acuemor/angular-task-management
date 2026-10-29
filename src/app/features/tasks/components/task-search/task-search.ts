import { Component, inject, output } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, catchError, of, switchMap,  } from 'rxjs';
import { TodoApiService } from '../../services/todo-api';
import type { Todo } from '../../models/todo.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-task-search',
  styleUrl: './task-search.scss',
  templateUrl: './task-search.html',
})
export class TaskSearch {
  readonly taskSearchForm = new FormGroup({
    inputSearch: new FormControl('', {
      nonNullable: true,
      validators: [
      ],
    }),
  });

  protected readonly searchTermChange = output<string>();
  protected readonly  inputSearch$ = this.taskSearchForm.controls.inputSearch.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntilDestroyed()
    )
    .subscribe(term => {
      this.searchTermChange.emit(term.trim());
    });



  // Usamos la barra de búsqueda para lanzar peticiones HTTP contra un servidor, y así utilizar métodos como switchMap.
  // private readonly todoApi = inject(TodoApiService);
  // protected readonly inputSearch$ =
  //   this.taskSearchForm.controls.inputSearch.valueChanges.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged(),
  //     switchMap(term => {
  //       const searchTerm = term.trim();

  //       if (!searchTerm) {
  //         return of([]);
  //       }

  //       return this.todoApi.searchTodos(searchTerm).pipe(
  //         catchError(error => {
  //           console.error('Error en la búsqueda de tareas:', error);
  //           return of([]);
  //         })
  //       );
  //     })
  //   );
  // protected readonly results = toSignal(this.inputSearch$, {
  //   initialValue: [] as Todo[],
  // });

}
