import {
  createReducer, on,
} from '@ngrx/store';
import {
  AuthState, authInitialState,
} from './auth.state';
import {AuthActions} from '.';

export const authReducer = createReducer<AuthState>(
  authInitialState,
  on(AuthActions.initializeAuthSuccess, (state, {user}) => ({
    ...state,
    isInitialized: true,
    isAuthenticated: !!user && user.role === 'admin',
    user,
    hasError: false,
    errorMessage: '',
  })),
  on(AuthActions.initializeAuthFailure, (state, {error}) => ({
    ...state,
    isInitialized: true,
    isAuthenticated: false,
    hasError: true,
    errorMessage: error,
    user: null,
  })),
  on(AuthActions.loginSuccess, (state, {user}) => ({
    ...state,
    isAuthenticated: true,
    hasError: false,
    errorMessage: '',
    user,
  })),
  on(AuthActions.loginFailure, (state, {error}) => ({
    ...state,
    isAuthenticated: false,
    hasError: true,
    errorMessage: error,
    user: null,
  })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    hasError: false,
    errorMessage: '',
  })),
  on(AuthActions.logoutFailure, (state, {error}) => ({
    ...state,
    isAuthenticated: false,
    hasError: true,
    errorMessage: error,
    user: null,
  })),
);
