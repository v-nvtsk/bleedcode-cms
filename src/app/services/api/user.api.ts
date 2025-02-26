import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  Observable, throwError,
} from 'rxjs';
import {
  map, catchError,
} from 'rxjs/operators';
import {getApiBaseUrl} from '@/utils/get-api-base-url';

interface User {
  id: number
  username: string
  role: string
  status: string
}

@Injectable({providedIn: 'root'})
export class UsersApi {
  private readonly apiUrl = getApiBaseUrl();

  constructor(private http: HttpClient) {}

  /**
   * Получает пользователя по его идентификатору.
   *
   * @param id - Идентификатор пользователя.
   * @returns Observable<User> с данными пользователя или ошибкой, если пользователь не найден.
   */
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profiles/${id}`, {
      observe: 'response',
      withCredentials: true,
    }).pipe(
      map((response) => {
        if (response.status === 200) {
          return response.body as User;
        }
        throw new Error(`Unexpected status: ${response.status}`);
      }),
      catchError((err) => {
        if (err.status === 404) {
          return throwError(() => new Error('Пользователь не найден'));
        }

        return throwError(() => new Error(`Ошибка сервера: ${err.status}`));
      }),
    );
  }

  /**
   * Получает список пользователей.
   *
   * @returns Observable<User[]> с массивом пользователей.
   * @throws Ошибка, если получение списка не удалось.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/profiles/`, {
      observe: 'response',
      withCredentials: true,
    }).pipe(
      map((response) => {
        if (response.status === 200) {
          return response.body as User[];
        }
        throw new Error(`Unexpected status: ${response.status}`);
      }),
      catchError((err) => throwError(() => new Error(`Ошибка получения списка пользователей: ${err.status}`))),
    );
  }

  /**
   * Обновляет пользователя.
   *
   * @param user - Объект пользователя для обновления.
   * @returns Observable<boolean>, указывающее на успешность обновления.
   * @throws Ошибка, если обновление не удалось.
   */
  updateUser(user: User): Observable<boolean> {
    return this.http.put(`${this.apiUrl}/profiles/update/${user.id}`, user, {
      observe: 'response',
      withCredentials: true,
    }).pipe(
      map((response) => {
        if (response.status === 200 || response.status === 204) {
          return true;
        }
        throw new Error(`Unexpected status: ${response.status}`);
      }),
      catchError((err) => throwError(() => new Error(`Ошибка обновления пользователя: ${err.status}`))),
    );
  }
}
