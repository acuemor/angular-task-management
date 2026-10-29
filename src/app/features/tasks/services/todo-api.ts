import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private readonly http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos?_limit=5',
    );
  }

  public searchTodos(term: string): Observable<Todo[]> {
    const params = new HttpParams()
      .set('title_like', term)
      .set('_limit', 5);

    return this.http.get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`, { params });
  }
}
