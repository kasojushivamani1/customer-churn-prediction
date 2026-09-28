import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase.js';
import { api } from '../../lib/api.js';

const AuthContext = createContext(null);

/**
 * Tracks the Firebase session (firebaseUser) and the matching Converso account
 * (appUser, including `roles`). Every Firebase sign-in is synced to our own database
 * through POST /auth/sync, which creates the account on first sight.
 */
export function AuthProvider({ children }) {
  // undefined = "don't know yet" (first check still running); null = signed out.
  const [firebaseUser, setFirebaseUser] = useState(undefined);
  const [appUser, setAppUser] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        setFirebaseUser(user);

        if (!user) {
          setAppUser(null);
          return;
        }

        setSyncing(true);
        try {
          const { user: syncedUser } = await api.post('/auth/sync');
          setAppUser(syncedUser);
          setAuthError(null);
        } catch (err) {
          setAuthError(err.message);
        } finally {
          setSyncing(false);
        }
      }),
    [],
  );

  async function refreshAppUser() {
    const { user } = await api.get('/users/me');
    setAppUser(user);
    return user;
  }

  const value = useMemo(
    () => ({
      firebaseUser,
      appUser,
      loading: firebaseUser === undefined || syncing,
      authError,
      refreshAppUser,
      async signUpWithEmail(name, email, password) {
        setAuthError(null);
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(credential.user, { displayName: name });
      },
      async signInWithEmail(email, password) {
        setAuthError(null);
        await signInWithEmailAndPassword(auth, email, password);
      },
      async signInWithGoogle() {
        setAuthError(null);
        await signInWithPopup(auth, googleProvider);
      },
      async signOutUser() {
        await signOut(auth);
      },
    }),
    [firebaseUser, appUser, syncing, authError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
