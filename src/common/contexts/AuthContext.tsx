// import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import API from '../services/api';

// interface User {
//   _id: string;
//   email: string;
//   FName: string;
//   LName: string;
//   gradeId?: number;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       API.get('/auth/me')
//         .then(res => setUser(res.data))
//         .catch(() => localStorage.removeItem('token'))
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = async (email: string, password: string) => {
//     const res = await API.post('/auth/login', { email, password });
//     localStorage.setItem('token', res.data.token);
//     setUser(res.data.user);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => React.useContext(AuthContext);
// src/common/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';
import API from '../services/api';

interface User {
  _id: string;
  FName: string;
  MName?: string;
  LName: string;
  email: string;
  gender?: string;
  gradeId?: number;
  purchasedDifficulties: number[]; // ✅ ADD THIS
  isPremium: boolean; // ✅ ADD THIS
  roles?: string[];
  permissions?: string[];
  PImage?: string[];
  status?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>; // ✅ ADD THIS - to refresh user data after payment
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Function to fetch/refresh user data
  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser()
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await API.post('/auth/login', { email, password });
    const { accessToken, refreshToken, user: userData } = res.data;
    
    // ✅ Store token
    localStorage.setItem('token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    
    // ✅ Set user with all fields including purchasedDifficulties
    setUser({
      _id: userData.id || userData._id,
      FName: userData.FName,
      MName: userData.MName || '',
      LName: userData.LName,
      email: userData.email,
      gender: userData.gender,
      gradeId: userData.gradeId,
      roles: userData.roles || [],
      permissions: userData.permissions || [],
      purchasedDifficulties: userData.purchasedDifficulties || [], // ✅ IMPORTANT
      isPremium: userData.isPremium || false, // ✅ IMPORTANT
      PImage: userData.PImage || [],
      status: userData.status || 'active',
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  // ✅ Refresh user data (called after payment)
  const refreshUser = async () => {
    try {
      const userData = await fetchUser();
      return userData;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};