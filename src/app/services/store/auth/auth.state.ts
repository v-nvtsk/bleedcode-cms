import {User} from '@/types/index';

export interface AuthState {
  isInitialized: boolean
  isAuthenticated: boolean
  hasError: boolean
  errorMessage: string
  user: User | null
}
export const authInitialState: AuthState = {
  isInitialized: false,
  isAuthenticated: false,
  hasError: false,
  errorMessage: '',
  user: null,
};
