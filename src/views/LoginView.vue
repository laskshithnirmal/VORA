<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('emilys'); //  Default
const password = ref('emilyspass');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  const success = await authStore.login(username.value, password.value);
  isLoading.value = false;
  
  if (success) {
    router.push('/'); //  Home 
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-20 bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
    <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Sign in to VORA</h2>
    
    <div v-if="authStore.error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm text-center">
      {{ authStore.error }}
    </div>

    <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
        <input 
          v-model="username" 
          type="text" 
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input 
          v-model="password" 
          type="password" 
          required
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-yellow-400 outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full bg-[#FFC107] hover:bg-yellow-500 text-black py-2.5 rounded-md font-bold transition flex justify-center mt-2 disabled:opacity-50"
      >
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>
    </form>
    <p class="text-sm text-gray-500 text-center mt-4">
  Don't have an account? 
  <router-link to="/register" class="text-yellow-600 font-bold hover:underline">Sign Up</router-link>
</p>
    <p class="text-xs text-gray-500 text-center mt-6">
      Test Account - User: <b>emilys</b> | Pass: <b>emilyspass</b>
    </p>
  </div>
</template>