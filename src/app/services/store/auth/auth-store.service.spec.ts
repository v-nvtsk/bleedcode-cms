import {TestBed} from '@angular/core/testing';
import {
  provideMockStore, MockStore,
} from '@ngrx/store/testing';
import * as AuthActions from './auth.actions';
import {AuthSelectors} from '.';
import {AuthState} from './auth.state';
import {User} from '../../../../types';

describe('Auth Store', () => {
  let store: MockStore;
  const initialState = {auth: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  }};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
      provideMockStore({initialState}),
    ]});
    store = TestBed.inject(MockStore);
  });
  it('should handle login action', (done) => {
    const username = 'testuser';
    const password = 'password123';
    const expectedState: AuthState = {
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      hasError: false,
      errorMessage: '',
    };
    
    store.overrideSelector(AuthSelectors.selectAuthState, expectedState);
    store.refreshState();
    store.dispatch(AuthActions.login({
      username,
      password,
    }));
    store.select(AuthSelectors.selectAuthState).subscribe((state) => {
      expect(state).toEqual(expectedState);
      done();
    });
  });
  it('should handle loginSuccess action', (done) => {
    const user: User = {
      id: 1,
      username: 'Test User',
      role: 'admin',
      accessToken: 'token123',
      state: '',
      tasks: [],
      rating: 0,
    };
    const expectedState: AuthState = {
      user,
      isAuthenticated: true,
      isInitialized: false,
      hasError: false,
      errorMessage: '',
    };
    
    store.overrideSelector(AuthSelectors.selectAuthState, expectedState);
    store.overrideSelector(AuthSelectors.selectIsAuthenticated, true);
    store.overrideSelector(AuthSelectors.selectUser, user);
    store.refreshState();
    store.dispatch(AuthActions.loginSuccess({user}));
    store.select(AuthSelectors.selectAuthState).subscribe((state) => {
      expect(state).toEqual(expectedState);
      store.select(AuthSelectors.selectIsAuthenticated).subscribe((isAuthenticated) => {
        expect(isAuthenticated).toBe(true);
        store.select(AuthSelectors.selectUser).subscribe((userData) => {
          expect(userData).toEqual(user);
          done();
        });
      });
    });
  });
  it('should handle loginFailure action', (done) => {
    const errorMessage = 'Invalid credentials';
    const expectedState: AuthState = {
      user: null,
      isAuthenticated: false,
      isInitialized: false,
      hasError: false,
      errorMessage: '',
    };
    
    store.overrideSelector(AuthSelectors.selectAuthState, expectedState);
    store.overrideSelector(AuthSelectors.selectErrorMessage, errorMessage);
    store.refreshState();
    store.dispatch(AuthActions.loginFailure({error: errorMessage}));
    store.select(AuthSelectors.selectAuthState).subscribe((state) => {
      expect(state).toEqual(expectedState);
      store.select(AuthSelectors.selectErrorMessage).subscribe((errorMessage) => {
        expect(errorMessage).toBe(errorMessage);
        done();
      });
    });
  });
});
