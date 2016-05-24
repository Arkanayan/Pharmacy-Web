// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';
import { FirebaseService } from './firebase/firebase.service'

// Application wide providers
export const APP_PROVIDERS = [
  AppState,
  FirebaseService
];
