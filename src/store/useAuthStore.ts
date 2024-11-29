import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types/auth';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  isCompanyAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (loading) => set({ isLoading: loading }),
      isCompanyAdmin: () => get().user?.role === 'company_admin',
      isSuperAdmin: () => get().user?.role === 'super_admin',
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Set up auth state listener
onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    // You might want to fetch additional user data from Firestore here
    const user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || '',
      role: 'user', // This should be fetched from Firestore in a real app
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    useAuthStore.getState().setUser(user);
  } else {
    useAuthStore.getState().setUser(null);
  }
  useAuthStore.getState().setLoading(false);
});
