import {Task} from '@/types';

export interface TasksState {
  isFetching: boolean
  isUpdating: boolean
  hasError: boolean
  errorMessage: string
  categories: string[]
  tasks: Task[]
  currentTask: Task | null
}
export const tasksInitialState: TasksState = {
  isFetching: false,
  isUpdating: false,
  hasError: false,
  errorMessage: '',
  categories: [],
  tasks: [],
  currentTask: null,
};
