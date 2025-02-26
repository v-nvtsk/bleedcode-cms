import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import {AuthState} from './auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');
// Безопасные селекторы с fallback-значениями
export const selectIsInitialized = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state ? state.isInitialized : false,
);
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state ? state.isAuthenticated : false,
);
export const selectErrorMessage = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state ? state.errorMessage : '',
);
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState | undefined) => state ? state.user : null,
);
