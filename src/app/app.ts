import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('task-management');

  protected changeTitle(): void {
    this.title.set('Mi gestor de tareas');
  }

  protected resetTitle(): void {
    this.title.set('task-management');
  }
}
