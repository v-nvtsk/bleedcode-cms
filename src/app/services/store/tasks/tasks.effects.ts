import {
  inject, Injectable,
} from '@angular/core';
import {
  Actions, createEffect,
  ofType,
} from '@ngrx/effects';
import {TasksApiService} from '../../api/tasks.api.service';
import {TasksActions} from '.';
import {
  catchError, map, of, switchMap,
} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TasksEffects {
  private actions$ = inject(Actions);

  constructor(
    
    private tasksApi: TasksApiService) {}

  getAllCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getAllCategories),
      switchMap(() => this.tasksApi.getAllCategories().pipe(
        map((categories) => TasksActions.getAllCategoriesSuccess({categories})),
        catchError((err) => of(TasksActions.getAllCategoriesFailure({error: err.message})),
        ),
      )),
    ),
  );

  loadTasks = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.tasksApi.getAllTasks({}).pipe(
          map((tasks) => TasksActions.loadTasksSuccess({tasks}),
          ),
          catchError((err) => of(TasksActions.loadTasksFailure({error: err.message}))),
        ),
      ),
    ),
  );

  getTask = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTask),
      switchMap(({id}) =>
        this.tasksApi.getTask(id).pipe(
          map((task) => TasksActions.getTaskSuccess({task})),
          catchError((err) => of(TasksActions.getTaskFailure({error: err.message}))),
        ),
      )));

  updateTask = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      switchMap(({task}) =>
        this.tasksApi.updateTask(task).pipe(
          map(() => TasksActions.updateTaskSuccess({task})),
          catchError((err) => of(TasksActions.updateTaskFailure({error: err.message}))),
        ),
      ),
    ));

  deleteTask = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      switchMap(({id}) =>
        this.tasksApi.deleteTask(id).pipe(
          map(() => TasksActions.deleteTaskSuccess({id})),
          catchError((err) => of(TasksActions.deleteTaskFailure({error: err.message}))),
        ),
      ),
    ),
  );

  createTask = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.createTask),
      switchMap(({task}) =>
        this.tasksApi.createTask(task).pipe(
          map((res) => TasksActions.createTaskSuccess({task: res})),
          catchError((err) => of(TasksActions.createTaskFailure({error: err.message}))),
        ),
      ),
    ),
  );
}
