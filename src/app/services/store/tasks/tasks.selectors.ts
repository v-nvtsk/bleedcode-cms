import {
  createFeatureSelector, createSelector,
} from '@ngrx/store';
import {TasksState} from './tasks.state';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');
export const getAllCategories = createSelector(
  selectTasksState,
  (state: TasksState) => state.categories);
export const selectTasks = createSelector(
  selectTasksState,
  (state: TasksState) => state.tasks,
);
export const selectCurrentTask = createSelector(
  selectTasksState,
  (state) => state.currentTask);
