import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '../types/auth';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  isCompanyAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  logout: () => Promise<void>;
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
      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, isAuthenticated: false });
        } catch (error) {
          console.error('Error signing out:', error);
          throw error;
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Set up auth state listener
onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    try {
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: userData.displayName || firebaseUser.displayName || '',
          role: userData.role || 'user',
          companyName: userData.companyName,
          industry: userData.industry,
          phone: userData.phone,
          createdAt: userData.createdAt?.toDate() || new Date(),
          updatedAt: userData.updatedAt?.toDate() || new Date(),
        };
        useAuthStore.getState().setUser(user);
      } else {
        // If no Firestore document exists, create a basic user
        const user: User = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        useAuthStore.getState().setUser(user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Set basic user data if Firestore fetch fails
      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || '',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      useAuthStore.getState().setUser(user);
    }
  } else {
    useAuthStore.getState().setUser(null);
  }
  useAuthStore.getState().setLoading(false);
});
