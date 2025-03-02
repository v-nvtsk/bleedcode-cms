import {authReducer} from './auth/auth.reducer';
import {profilesReducer} from './profiles/profiles.reducer';
import {tasksReducer} from './tasks/tasks.reducer';
import {AuthEffects} from './auth';
import {TasksEffects} from './tasks/tasks.effects';
import {ProfilesEffects} from './profiles/profiles.effects';

export const store = {
  auth: authReducer,
  tasks: tasksReducer,
  profiles: profilesReducer,
};
export const storeEffects = [
  AuthEffects,
  TasksEffects,
  ProfilesEffects,
];
