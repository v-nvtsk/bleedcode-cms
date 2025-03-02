import {
  ApplicationConfig, provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {
  provideHttpClient, withInterceptors,
} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {provideStore} from '@ngrx/store';
import {baseUrlInterceptor} from './interceptors/base-url.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideMonacoEditor} from 'ngx-monaco-editor-v2';
import {
  store, storeEffects,
} from './services/store/store';

export const appConfig: ApplicationConfig = {providers: [
  provideZoneChangeDetection({eventCoalescing: true}),
  provideAnimations(),
  provideRouter(routes),
  provideStore(store),
  provideEffects(storeEffects),
  provideHttpClient(
    withInterceptors([baseUrlInterceptor]),
  ), provideAnimationsAsync(),
  provideMonacoEditor(),
]};
