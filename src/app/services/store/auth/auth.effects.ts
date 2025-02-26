import {Injectable} from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {AuthApi} from '@/app/services/api/auth.api';
import * as AuthActions from './auth.actions';
import {
  catchError, map, switchMap,
  tap,
} from 'rxjs/operators';
import {
  Observable, of,
} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  ActivatedRoute, Router,
} from '@angular/router';

@Injectable()
export class AuthEffects {
  initialize$: Observable<Action>;

  login$: Observable<Action>;

  loginSuccessRedirect$: Observable<Action>;

  logout$: Observable<Action>;

  constructor(
    private actions$: Actions,
    private authApi: AuthApi,
    private router: Router,
    private route: ActivatedRoute) {
    this.initialize$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.initializeAuth),
        switchMap(() => this.authApi.updateSession().pipe(
          map((user) => AuthActions.initializeAuthSuccess({user})),
          catchError((err) => of(AuthActions.initializeAuthFailure({error: err.message}))),
        ),
        ),
      ),
    );
    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        switchMap(({
          username, password,
        }) =>
          this.authApi.login(username, password).pipe(
            map((user) => AuthActions.loginSuccess({user})),
            catchError((err) => of(AuthActions.loginFailure({error: err.message}))),
          ),
        ),
      ),
    );
    this.loginSuccessRedirect$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.loginSuccess),
          tap(() => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

            this.router.navigate([returnUrl]);
          }),
        ),
      {dispatch: false},
    );
    this.logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() =>
          this.authApi.logout().pipe(
            map(() => AuthActions.logoutSuccess()),
            catchError((err) => of(AuthActions.logoutFailure({error: err.message}))),
            
          ),
        ),
      ),
    );
  }
}
