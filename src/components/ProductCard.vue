<script setup lang="ts">
import { defineProps } from 'vue';
import type { Product } from '../types';

defineProps<{
  product: Product;
}>();
</script>

<template>
  <!--card border & Dark Mode -->
  <div class="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col p-5 transition-all duration-300">
    
    <!-- Product picture -->
    <div class="bg-gray-50 dark:bg-white rounded-lg mb-4 h-48 flex items-center justify-center p-4">
      <img :src="product.thumbnail" :alt="product.title" class="max-h-full object-contain mix-blend-multiply" />
    </div>
    
    <!-- Details -->
    <div class="flex flex-col flex-grow">
      <!-- Category -->
      <p class="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">{{ product.category }}</p>
      
      <!-- Title -->
      <h3 class="text-base font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2">{{ product.title }}</h3>
      
      <!-- Ratings -->
      <div class="flex items-center text-yellow-400 text-sm mb-4">
        <span>★★★★☆</span>
        <span class="text-gray-400 dark:text-gray-500 text-xs ml-2">({{ Math.floor(Math.random() * 500) + 50 }})</span>
      </div>
      
      <!-- Price and button -->
      <div class="mt-auto flex justify-between items-center">
        <!-- Price -->
        <span class="text-xl font-extrabold text-gray-900 dark:text-white">${{ product.price.toFixed(2) }}</span>
            
        <router-link :to="`/product/${product.id}`" 
        class="bg-[#FFC107] hover:bg-yellow-500 text-black px-5 py-1.5 rounded-md text-sm font-bold transition inline-block text-center">
        Details
        </router-link>
            </div>
            </div>

  </div>
</template>