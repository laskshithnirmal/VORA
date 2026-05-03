<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);
const successMessage = ref('');

// Form 
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: ''
});

const handleRegister = async () => {
  isLoading.value = true;
  
  try {
    // DummyJSON 
    const response = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });

    if (response.ok) {
      successMessage.value = 'Account created successfully! Redirecting to login...';
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  } catch (error) {
    console.error('Registration error:', error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto mt-10 bg-white dark:bg-[#1e293b] p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
    <h2 class="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">Create VORA Account</h2>
    
    <!-- Success message -->
    <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm text-center">
      {{ successMessage }}
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
          <input v-model="formData.firstName" type="text" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
          <input v-model="formData.lastName" type="text" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
        <input v-model="formData.email" type="email" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-yellow-400" />
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
        <input v-model="formData.username" type="text" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-yellow-400" />
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
        <input v-model="formData.password" type="password" required class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent dark:text-white outline-none focus:ring-2 focus:ring-yellow-400" />
      </div>

      <button 
        type="submit" 
        :disabled="isLoading"
        class="w-full bg-[#FFC107] hover:bg-yellow-500 text-black py-2.5 rounded-md font-bold transition flex justify-center mt-2 disabled:opacity-50"
      >
        {{ isLoading ? 'Creating Account...' : 'Sign Up' }}
      </button>
    </form>
    
    <p class="text-sm text-gray-500 text-center mt-6">
      Already have an account? 
      <router-link to="/login" class="text-yellow-600 font-bold hover:underline">Sign In</router-link>
    </p>
  </div>
</template>