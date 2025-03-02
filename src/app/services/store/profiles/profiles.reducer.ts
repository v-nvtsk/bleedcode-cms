import {
  createReducer, on,
} from '@ngrx/store';
import {profilesInitialState} from './profiles.state';
import {ProfilesActions} from '.';

export const profilesReducer = createReducer(
  profilesInitialState,
  on(ProfilesActions.getProfiles, (state) => ({
    ...state,
    isFetching: true,
    hasError: false,
    errorMessage: '',
  })),
  on(ProfilesActions.getProfilesSuccess, (state, {profiles}) => ({
    ...state,
    isFetching: false,
    profiles,
    hasError: false,
  })),
  on(ProfilesActions.getProfilesFailure, (state, {error}) => ({
    ...state,
    isFetching: false,
    hasError: true,
    errorMessage: error,
  })),
  //
  on(ProfilesActions.getProfile, (state) => ({
    ...state,
    isFetching: true,
    hasError: false,
    errorMessage: '',
  })),
  on(ProfilesActions.getProfileSuccess, (state, {profile}) => ({
    ...state,
    isFetching: false,
    profile,
    hasError: false,
  })),
  on(ProfilesActions.getProfileFailure, (state, {error}) => ({
    ...state,
    isFetching: false,
    hasError: true,
    errorMessage: error,
  })),
  //
);
