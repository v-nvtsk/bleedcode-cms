import {
  createAction, props,
} from '@ngrx/store';
import {Task} from '@/types';

export const loadTasks = createAction('[Tasks] Load');
export const loadTasksSuccess = createAction('[Tasks] Load Success', props<{tasks: Task[]}>());
export const loadTasksFailure = createAction('[Tasks] Load Failure', props<{error: string}>());
export const updateTask = createAction('[Tasks] Update', props<{task: Task}>());
export const updateTaskSuccess = createAction('[Tasks] Update Success', props<{task: Task}>());
export const updateTaskFailure = createAction('[Tasks] Update Failure', props<{error: string}>());
export const deleteTask = createAction('[Tasks] Delete', props<{id: number}>());
export const deleteTaskSuccess = createAction('[Tasks] Delete Success', props<{id: number}>());
export const deleteTaskFailure = createAction('[Tasks] Delete Failure', props<{error: string}>());
export const getTask = createAction('[Tasks] Get', props<{id: number}>());
export const getTaskSuccess = createAction('[Tasks] Get Success', props<{task: Task}>());
export const getTaskFailure = createAction('[Tasks] Get Failure', props<{error: string}>());
export const createTask = createAction('[Tasks] Create', props<{task: Omit<Task, 'id'>}>());
export const createTaskSuccess = createAction('[Tasks] Create Success', props<{task: Task}>());
export const createTaskFailure = createAction('[Tasks] Create Failure', props<{error: string}>());
export const getTaskSolution = createAction('[Tasks] Get Solution', props<{
  taskId: number | string
  userId: number | string
}>());
export const getTaskSolutionSuccess = createAction('[Tasks] Get Solution Success', props<{solution: string}>());
export const getTaskSolutionFailure = createAction('[Tasks] Get Solution Failure', props<{error: string}>());
export const getAllCategories = createAction('[Tasks] Get All Categories');
export const getAllCategoriesSuccess = createAction('[Tasks] Get All Categories Success', props<{categories: string[]}>());
export const getAllCategoriesFailure = createAction('[Tasks] Get All Categories Failure', props<{error: string}>());
