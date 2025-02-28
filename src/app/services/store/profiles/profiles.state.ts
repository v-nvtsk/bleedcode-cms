import {UserProfile} from '@/types';

export interface ProfilesState {
  isFetching: boolean
  hasError: boolean
  errorMessage: string
  profiles: UserProfile[]
}
export const profilesInitialState: ProfilesState = {
  isFetching: false,
  hasError: false,
  errorMessage: '',
  profiles: [],
};
