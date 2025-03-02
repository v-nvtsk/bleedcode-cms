import {
  createAction, props,
} from '@ngrx/store';
import {UserProfile} from '../../../../types';

export const getProfiles = createAction('[Profiles] Get All Profiles');
export const getProfilesSuccess = createAction('[Profiles] Get All Profiles Success', props<{profiles: UserProfile[]}>());
export const getProfilesFailure = createAction('[Profiles] Get All Profiles Failure', props<{error: string}>());
//
export const getProfile = createAction('[Profiles] Get Profile', props<{id: number}>());
export const getProfileSuccess = createAction('[Profiles] Get Profile Success', props<{profile: UserProfile}>());
export const getProfileFailure = createAction('[Profiles] Get Profile Failure', props<{error: string}>());
//
export const updateProfile = createAction('[Profiles] Update Profile', props<{
  id: number
  profile: UserProfile
}>());
export const updateProfileSuccess = createAction('[Profiles] Update Profile Success', props<{
  id: number
  profile: UserProfile
}>());
export const updateProfileFailure = createAction('[Profiles] Update Profile Failure', props<{error: string}>());
