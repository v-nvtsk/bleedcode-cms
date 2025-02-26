import {CanActivateFn} from '@angular/router';
import {inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {
  Observable, of,
} from 'rxjs';
import {
  filter, map, switchMap, take,
} from 'rxjs/operators';
import {AuthSelectors} from '@/app/services/store/auth';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const store = inject(Store);
  const router = inject(Router);

  if (state.url === '/auth') {
    return of(true);
  }

  return store.select(AuthSelectors.selectIsInitialized).pipe(
    filter((isInitialized) => isInitialized),
    take(1),
    switchMap(() => store.select(AuthSelectors.selectIsAuthenticated)),
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/auth'], {queryParams: {returnUrl: state.url}});
      }

      return isAuthenticated;
    }),
  );
};
