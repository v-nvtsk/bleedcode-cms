import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatCard, MatCardContent, MatCardHeader,
} from '@angular/material/card';
import {RouterLink} from '@angular/router'; // Для навигации
import {
  Observable, of,
} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    RouterLink, // Импортируем RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  categories$: Observable<string[]> = of([]);
}
