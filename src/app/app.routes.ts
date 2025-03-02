import {Routes} from '@angular/router';
import {UsersComponent} from './pages/users/users.component';
import {TasksComponent} from './pages/tasks/tasks.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AuthComponent} from './pages/auth/auth.component';
import {adminGuard} from './guards/admin.guard';
import {TaskEditComponent} from './pages/task-edit/task-edit.component';

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],

  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
  },
  {
    path: 'task/new',
    component: TaskEditComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
  },
  {
    path: 'task/:id',
    component: TaskEditComponent,
    runGuardsAndResolvers: 'always',
    canActivate: [adminGuard],
  },
];
