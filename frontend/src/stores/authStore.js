import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import API from '../utils/api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      
      login: async (email, password) => {
        const { data } = await API.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token });
        return data;
      },
      
      register: async (name, email, password, role) => {
        const { data } = await API.post('/auth/register', { name, email, password, role });
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token });
        return data;
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
      
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
