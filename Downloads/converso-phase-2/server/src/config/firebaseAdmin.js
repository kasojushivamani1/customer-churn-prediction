import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { env } from './env.js';

// .env stores the private key as one line with literal \n sequences; turn them back
// into real newlines before handing the key to the Firebase Admin SDK.
const credential = cert({
  projectId: env.FIREBASE_PROJECT_ID,
  clientEmail: env.FIREBASE_CLIENT_EMAIL,
  privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
});

const app = getApps()[0] ?? initializeApp({ credential });

export const firebaseAuth = getAuth(app);
