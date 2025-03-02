import {
  CommonModule, NgIf,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserProfile} from '../../../types';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {
  ProfilesActions, ProfilesSelectors,
} from '../../services/store/profiles';

interface User extends UserProfile {
  updatedRole: UserProfile['role']
  roleChanged: boolean
}

@Component({
  selector: 'app-users',
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  private store = inject(Store);

  // Локальное состояние пользователей через сигнал
  users = signal<User[]>([]);

  constructor() {
    this.store
      .select(ProfilesSelectors.selectProfiles)
      .pipe(
        map((profiles) =>
          profiles
            .map((profile) => ({
              ...profile,
              roleChanged: false,
              updatedRole: profile.role,
            })).sort((a, b) => a.id - b.id),
        ),
      )
      .subscribe((users) => this.users.set(users));
    this.store.dispatch(ProfilesActions.getProfiles());
  }

  saveRole(user: User) {
    const updatedUser = {
      ...user,
      role: user.updatedRole,
      roleChanged: false,
    };

    this.store.dispatch(
      ProfilesActions.updateProfile({
        id: user.id,
        profile: {
          ...user,
          role: user.updatedRole,
        },
      }),
    );
    this.users.update((users) =>
      users.map((u) => (u.id === user.id ? updatedUser : u)),
    );
  }

  onRoleChange(user: User, newRoleId: number | string) {
    const newRole = {
      id: +newRoleId,
      name: '',
    };

    this.users.update((users) =>
      users.map((u) =>
        u.id === user.id
          ? {
              ...u,
              updatedRole: newRole,
              roleChanged: newRole.id !== u.role.id,
            }
          : u,
      ),
    );
  }
}
