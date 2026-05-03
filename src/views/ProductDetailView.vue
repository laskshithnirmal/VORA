<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Product } from '../types';
import { useCartStore } from '../stores/cart';
const cartStore = useCartStore();
const quantity = ref(1); 

const route = useRoute();
const router = useRouter();
const product = ref<Product | null>(null);
const loading = ref(true);

// URL  ID Fetch 
onMounted(async () => {
  try {
    const id = route.params.id; 
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    product.value = await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div v-if="loading" class="text-center py-20">
    <p class="text-xl text-gray-600 dark:text-gray-300 animate-pulse">Details are loading... ⏳</p>
  </div>

  <div v-else-if="product" class="max-w-5xl mx-auto bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-6 md:p-10 transition-colors duration-300">
    
    <!-- Back Button  -->
    <button @click="router.back()" class="flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white mb-8 font-medium transition">
      <span>←</span> Back to Products
    </button>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      
      <!--Left: Picture -->
      <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex items-center justify-center">
        <img :src="product.thumbnail" :alt="product.title" class="w-full max-w-sm object-contain mix-blend-multiply dark:mix-blend-normal" />
      </div>

      <!-- Right: Details-->
      <div class="flex flex-col justify-center">
        <p class="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-2">{{ product.category }}</p>
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">{{ product.title }}</h1>
        
        <div class="flex items-center text-yellow-400 mb-6">
          <span class="text-lg">★★★★☆</span>
          <span class="text-gray-700 dark:text-gray-300 font-bold ml-2">{{ product.rating }}</span>
          <span class="text-gray-400 ml-2 text-sm">({{ product.stock }} in stock)</span>
        </div>

        <p class="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">${{ product.price.toFixed(2) }}</p>
        <p class="text-sm text-green-600 dark:text-green-400 font-medium mb-6 flex items-center gap-1">
          ✓ Free Returns & Delivery
        </p>

        <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{{ product.description }}</p>

       <!-- Add to Cart  -->
<div class="flex items-center gap-4">
  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
     
    <button @click="quantity > 1 && quantity--" class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">−</button>
    <span class="px-4 py-2 font-bold text-gray-900 dark:text-white">{{ quantity }}</span>
    <button @click="quantity++" class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">+</button>
  </div>
  <button @click="cartStore.addToCart(product, quantity)" class="flex-1 bg-[#FFC107] hover:bg-yellow-500 text-black py-3 rounded-md font-bold text-lg transition flex justify-center items-center gap-2 shadow-sm">
    🛒 Add to Cart
  </button>
</div>

      </div>
    </div>
  </div>
</template>