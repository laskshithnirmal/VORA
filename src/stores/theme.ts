import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark');

  const toggleTheme = () => {
    isDark.value = !isDark.value;
    const theme = isDark.value ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  //theme එක check 
  const initTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    }
  };

  return { isDark, toggleTheme, initTheme };
});