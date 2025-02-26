import type {User} from '@/types';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  catchError,
  finalize,
  map,
  Observable, of, tap,
} from 'rxjs';
import {getApiBaseUrl} from '@/utils/get-api-base-url';

@Injectable({providedIn: 'root'})
export class AuthApi {
  private readonly apiUrl = getApiBaseUrl();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, {
      username,
      password,
    }, {withCredentials: true}).pipe(
      tap((response: User) => {
        localStorage.setItem('token', response.accessToken);
      }),
      map((response: User) => {
        if (response.role !== 'admin') {
          this.logout();
          throw new Error('Только администратор может войти в систему');
        }

        return response;
      }),
      catchError((response) => {
        let errorMessage = response.message;

        if (response.status === 401) {
          errorMessage = 'Неправильное имя пользователя или пароль';
        }
        throw new Error(errorMessage);
      }),
    );
  }

  logout(): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/auth/logout`, {withCredentials: true}).pipe(
      catchError(() => {
        return of(null);
      }),
      finalize(() => localStorage.removeItem('token')),
    );
  }

  updateSession(): Observable<User | null> {
    const accessToken = localStorage.getItem('token');
  
    if (!accessToken) {
      return of(null);
    }
  
    return this.http.post<User>(`${this.apiUrl}/auth/refresh`, {accessToken}, {withCredentials: true}).pipe(
      tap((response) => localStorage.setItem('token', response.accessToken)),
      map((response) => response),
      catchError(() => {
        localStorage.removeItem('token');

        return of(null);
      }),
    );
  }
}
