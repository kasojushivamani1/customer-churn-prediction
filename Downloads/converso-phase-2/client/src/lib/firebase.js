import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const missing = Object.entries(config)
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length) {
  throw new Error(
    `Missing Firebase config: ${missing.join(', ')}. Copy client/.env.example to client/.env ` +
      'and fill in your Firebase project\'s web app values (see README > Firebase setup).',
  );
}

export const firebaseApp = initializeApp(config);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
