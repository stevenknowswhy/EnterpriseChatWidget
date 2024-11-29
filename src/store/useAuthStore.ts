import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        auth.signOut();
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth-storage' }
  )
);

// Set up Firebase auth state listener
onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    const user = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
      role: 'user',
      companyId: '1'
    };
    useAuthStore.getState().login(user);
  } else {
    useAuthStore.getState().logout();
  }
});
