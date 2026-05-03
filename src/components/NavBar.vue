<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '../stores/theme';
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { useSearchStore } from '../stores/search';
const searchStore = useSearchStore();

// --- Cart  ---
const cartStore = useCartStore();
const { totalItems } = storeToRefs(cartStore);

// --- Auth and Router  ---
const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

// --- Dark Mode ---
const isDark = ref(false);

const toggleDark = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
</script>

<template>
  <nav class="bg-[#111827] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <!-- Logo -->
    <div class="flex items-center gap-2 cursor-pointer" @click="router.push('/')">
      <div class="bg-white p-1 rounded-sm">
        <span class="text-black text-xs font-bold px-1">V</span>
      </div>
      <h1 class="text-2xl font-bold tracking-wide">VORA</h1>
    </div>

    <!-- Search Bar -->
    <div class="hidden md:flex flex-1 max-w-3xl mx-8">
     <input 
  v-model="searchStore.searchQuery"
  type="text" 
  placeholder="Search products..." 
  class="w-full px-4 py-2 text-black rounded-l-md outline-none focus:ring-2 focus:ring-yellow-400"
/>
      <button class="bg-[#FFC107] hover:bg-yellow-500 transition px-5 py-2 rounded-r-md text-black flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </button>
    </div>

    <!-- Right side menu -->
    <div class="flex items-center gap-6 text-sm font-medium">
      <!-- Dark Mode Button  -->
      <button @click="toggleDark" class="hover:text-yellow-400 transition text-lg">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
      
      <!-- Login / Logout -->
      <template v-if="!authStore.user">
        <router-link to="/login" class="hover:text-yellow-400 transition flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
          Sign In
        </router-link>
      </template>

      <template v-else>
        <div class="flex items-center gap-3">
          <!-- User  -->
          <div class="flex items-center gap-2">
            <img :src="authStore.user.image" alt="user" class="w-6 h-6 rounded-full bg-gray-200" />
            <span class="text-yellow-400 font-bold hidden sm:block">Hi, {{ authStore.user.firstName }}</span>
          </div>
          <button @click="handleLogout" class="hover:text-red-400 transition text-xs border border-gray-500 px-2 py-1 rounded">
            Sign Out
          </button>
        </div>
      </template>

      <!-- Cart  -->
      <router-link to="/cart" class="hover:text-yellow-400 transition flex items-center gap-1 relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg>
        Cart
        <span v-if="totalItems > 0" class="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {{ totalItems }}
        </span>
      </router-link>
    </div>
  </nav>
</template>