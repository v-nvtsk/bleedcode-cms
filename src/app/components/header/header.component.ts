import {
  Component, inject,
} from '@angular/core';
import {
  Router, RouterLink,
} from '@angular/router';
import {
  AsyncPipe, Location, NgIf,
} from '@angular/common';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  AuthActions, AuthSelectors,
} from '@/app/services/store/auth';

@Component({
  selector: 'main-header',
  standalone: true,
  imports: [NgIf, RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private router = inject(Router);

  private store = inject(Store);

  private location = inject(Location);

  isAuthenticated$: Observable<boolean>;

  constructor() {
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
    this.router
      .navigate(['/auth'], {queryParams: {returnUrl: this.location.path()}})
      .catch((err) => console.error('Header: Ошибка навигации:', err));
  }
}
