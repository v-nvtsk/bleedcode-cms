import {Injectable} from '@angular/core';
import type {
  Filter, Task,
} from '@/types';
import {
  catchError,
  map,
  Observable,
  throwError,
} from 'rxjs';
import {
  HttpClient, HttpParams,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import {getApiBaseUrl} from '@/utils/get-api-base-url';

@Injectable({providedIn: 'root'})
export class TasksApiService {
  private readonly apiUrl = getApiBaseUrl();

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tasks/categories`, {observe: 'response'}).pipe(
      map((res: HttpResponse<string[]>) => res.body || []),
      catchError((error) => throwError(() => new Error(`Ошибка при получении категорий: ${error.message}`))),
    );
  }

  getAllTasks({
    startFrom = 0, limit = 10, category = '', difficulty = '', popularity = {
      min: 1,
      max: 5,
    },
  }: Filter): Observable<Task[]> {
    const params = new HttpParams({fromObject: {
      'offset': startFrom,
      limit,
      category,
      difficulty,
      'popularity.min': popularity?.min,
      'popularity.max': popularity?.max,
    }});

    return this.http.get<Task[]>(`${this.apiUrl}/tasks`, {params}).pipe(
      map((tasks) => tasks || []),
      catchError((error) => throwError(() => new Error('Ошибка при получении списка задач: ' + error.message))),
    );
  }

  getTask(id: string | number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`, {withCredentials: true}).pipe(
      catchError(() => throwError(() => new Error('Ошибка при получении задачи'))),
    );
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task, {withCredentials: true}).pipe(
      catchError((error) => throwError(() => new Error('Ошибка при создании задачи: ' + error.message))),
    );
  }

  getTaskSolution(taskId: number | string, userId: number | string): Observable<string> {
    try {
      return this.http.get<string>(`${this.apiUrl}/solutions?task_id=${taskId}&user_id=${userId}`).pipe(
        catchError(() => throwError(() => new Error('Ошибка при получении решения'))),
      );
    }
    catch {
      throw new Error('Ошибка при получении решения');
    }
  }

  updateTask(task: Task): Observable<boolean> {
    return this.http.put<unknown>(`${this.apiUrl}/tasks/${task.id}`, task, {
      observe: 'response',
      withCredentials: true,
    }).pipe(
      map((res: HttpResponse<unknown>) => res.status === HttpStatusCode.Ok),
      catchError((error) => throwError(() => new Error('Ошибка при обновлении задачи: ' + error.message))),
    );
  }

  deleteTask(id: number): Observable<boolean> {
    return this.http.delete<unknown>(`${this.apiUrl}/tasks/${id}`, {
      observe: 'response',
      withCredentials: true,
    }).pipe(
      map((res: HttpResponse<unknown>) => res.status === HttpStatusCode.Ok),
      catchError((error) => throwError(() => new Error('Ошибка при удалении задачи: ' + error.message))),
    );
  }
}
