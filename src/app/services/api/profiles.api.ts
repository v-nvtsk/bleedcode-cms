import type {UserProfile} from '@/types';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  catchError,
  Observable,
  throwError,
} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProfilesApi {
  constructor(private http: HttpClient) {}

  getProfile(id: number): Observable<UserProfile | null> {
    return this.http.get<UserProfile>(`/profiles/${id}`, {withCredentials: true}).pipe(
      catchError(() => throwError(() => 'Ошибка получения профиля пользователя')),
    );
  }

  getProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>('/profiles', {withCredentials: true}).pipe(
      catchError(() => throwError(() => 'Ошибка получения списка пользователей')),
    );
  }

  updateProfile(id: number, profile: UserProfile): Observable<UserProfile> {
    return this.http.put<UserProfile>(`/profiles/update/${id}`, profile, {withCredentials: true}).pipe(
      catchError(() => throwError(() => 'Ошибка обновления профиля пользователя')),
    );
  }
}
