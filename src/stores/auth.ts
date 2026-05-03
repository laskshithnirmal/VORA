import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // LocalStorage & token/user
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
  const token = ref(localStorage.getItem('token') || null);
  const error = ref<string | null>(null);

  // Login function 
  const login = async (username: string, password: string) => {
    error.value = null;
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60, // token expire 
        })
      });

      if (!response.ok) {
        throw new Error('Username හෝ Password වැරදියි!');
      }

      const data = await response.json();
      
      // State & LocalStorage 
      user.value = data;
      token.value = data.token;
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      
      return true; // successful
    } catch (err: any) {
      error.value = err.message;
      return false; // failed
    }
  };

  // Logout function 
  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return { user, token, error, login, logout };
});