// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { AuthService } from './auth/auth.service'

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  AuthService
];
