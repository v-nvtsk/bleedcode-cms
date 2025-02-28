import {
  createReducer, on,
} from '@ngrx/store';
import {
  tasksInitialState, TasksState,
} from './tasks.state';
import {TasksActions} from '.';

export const tasksReducer = createReducer<TasksState>(
  tasksInitialState,
  on(TasksActions.loadTasksSuccess, (state, {tasks}) => ({
    ...state,
    hasError: false,
    isFetching: false,
    tasks,
  })),
  on(TasksActions.updateTaskSuccess, (state, {task}) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),
  on(TasksActions.deleteTaskSuccess, (state, {id}) => ({
    ...state,
    tasks: state.tasks.filter((t) => t.id !== id),
  })),
  on(TasksActions.createTaskSuccess, (state, {task}) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.getTaskSuccess, (state, {task}) => ({
    ...state,
    currentTask: task,
  })),
);
