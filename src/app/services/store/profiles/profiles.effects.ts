import {
  inject, Injectable,
} from '@angular/core';
import {
  Actions, createEffect, ofType,
} from '@ngrx/effects';
import {
  catchError, map, of, switchMap,
} from 'rxjs';
import {ProfilesActions} from '.';
import {ProfilesApi} from '../../api/profiles.api';

@Injectable({providedIn: 'root'})
export class ProfilesEffects {
  private actions$ = inject(Actions);

  constructor(private profilesApi: ProfilesApi) {}

  getProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.getProfiles),
      switchMap(() => this.profilesApi.getProfiles().pipe(
        map((profiles) => ProfilesActions.getProfilesSuccess({profiles})),
        catchError((err) => of(ProfilesActions.getProfilesFailure({error: err.message})),
        ),
      ),
      ),
    ));

  updateProfile = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.updateProfile),
      switchMap(({
        id, profile,
      }) =>
        this.profilesApi.updateProfile(id, profile).pipe(
          map((profile) => ProfilesActions.updateProfileSuccess({
            id,
            profile,
          })),
          catchError((err) => of(ProfilesActions.updateProfileFailure({error: err.message}))),
        ),
      ),
    ),
  );
}
