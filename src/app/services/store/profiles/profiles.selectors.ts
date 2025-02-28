import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import {ProfilesState} from './profiles.state';

export const selectProfilesState = createFeatureSelector<ProfilesState>('profiles');
export const selectProfiles = createSelector(
  selectProfilesState,
  (state) => state.profiles,
);
