import {Component} from '@angular/core';
import {
  AsyncPipe, NgIf,
} from '@angular/common';
import {
  ReactiveFormsModule, Validators,
  FormControl, FormGroup,
} from '@angular/forms';
import {
  ActivatedRoute, Router,
} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  Observable, Subscription,
} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  AuthActions, AuthSelectors,
} from '../../services/store/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatProgressSpinnerModule, AsyncPipe],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  errorMessage = '';

  isAuthenticated$: Observable<boolean>;

  isInitialized$: Observable<boolean>;

  errorMessage$: Observable<string>;

  private authSub: Subscription = new Subscription();
  
  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(20)],
      nonNullable: true,
    }),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });
  
  constructor(
    private authStore: Store,
    private router: Router, private route: ActivatedRoute) {
    this.isAuthenticated$ = this.authStore.select(AuthSelectors.selectIsAuthenticated);
    this.isInitialized$ = this.authStore.select(AuthSelectors.selectIsInitialized);
    this.errorMessage$ = this.authStore.select(AuthSelectors.selectErrorMessage);
  }

  handleSubmit() {
    if (this.form.valid) {
      const {
        username, password,
      } = this.form.value as {
        username: string
        password: string
      };

      this.authStore.dispatch(AuthActions.login({
        username,
        password,
      }));
    }
  }
}
