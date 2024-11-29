import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuthStore } from '../store/useAuthStore';
import { User } from '../types/auth';

interface ProfileUpdateData {
  displayName?: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  [key: string]: any;
}

export const useProfile = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          setUser({ ...user, ...userData });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user?.uid]);

  const updateProfile = async (data: ProfileUpdateData) => {
    if (!user?.uid) return;

    setLoading(true);
    setError(null);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...data,
        updatedAt: new Date(),
      });

      // Update local user state
      setUser({ ...user, ...data });

      // If it's a company admin, update company details
      if (user.role === 'company_admin' && data.companyName) {
        const companyRef = doc(db, 'companies', user.uid);
        await updateDoc(companyRef, {
          companyName: data.companyName,
          industry: data.industry,
          updatedAt: new Date(),
        });
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    updateProfile,
  };
};

export default useProfile;
