<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';

const cartStore = useCartStore();
const { items, totalPrice, totalItems } = storeToRefs(cartStore);
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

    <div v-if="items.length === 0" class="text-center py-20 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
      <p class="text-xl text-gray-500 dark:text-gray-400 mb-4">Your cart is empty.</p>
      <router-link to="/" class="text-indigo-600 hover:underline font-semibold">← Continue Shopping</router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Left: List of goods -->
      <div class="lg:col-span-2 bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div class="hidden sm:grid grid-cols-5 p-4 border-b border-gray-100 dark:border-gray-700 text-sm font-semibold text-gray-500 dark:text-gray-400">
          <div class="col-span-2">Product Details</div>
          <div class="text-center">Quantity</div>
          <div class="text-right">Price</div>
          <div class="text-right">Total</div>
        </div>

        <div v-for="item in items" :key="item.product.id" class="grid grid-cols-1 sm:grid-cols-5 items-center p-4 border-b border-gray-100 dark:border-gray-700 gap-4">
          <div class="col-span-2 flex items-center gap-4">
            <div class="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-md p-2 flex-shrink-0">
              <img :src="item.product.thumbnail" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
            </div>
            <div>
              <p class="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">{{ item.product.category }}</p>
              <h3 class="text-sm font-bold text-gray-900 dark:text-white line-clamp-2">{{ item.product.title }}</h3>
              <button 
  @click="cartStore.removeFromCart(item.product.id)" 
  class="group mt-2 flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 transition-all duration-200"
>
  <!-- ලස්සන SVG Trash Icon එකක් -->
  <div class="p-1.5 rounded-full bg-red-50 dark:bg-red-500/10 group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  </div>
  <span>Remove Item</span>
</button>
            </div>
          </div>
          <div class="text-center font-bold text-gray-900 dark:text-white">{{ item.quantity }}</div>
          <div class="text-right font-medium text-gray-500 dark:text-gray-400">${{ item.product.price.toFixed(2) }}</div>
          <div class="text-right font-extrabold text-gray-900 dark:text-white">${{ (item.product.price * item.quantity).toFixed(2) }}</div>
        </div>
        
        <div class="p-4">
          <router-link to="/" class="text-[#FFC107] hover:text-yellow-600 font-bold flex items-center gap-2">
            ← Continue Shopping
          </router-link>
        </div>
      </div>

      <!-- Right: Order Summary -->
      <div class="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 h-fit">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
        <div class="flex justify-between mb-4 text-gray-600 dark:text-gray-300">
          <span>Items ({{ totalItems }}):</span>
          <span class="font-bold text-gray-900 dark:text-white">${{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between mb-4 text-gray-600 dark:text-gray-300">
          <span>Shipping & handling:</span>
          <span class="text-green-600 font-bold">Free</span>
        </div>
        <hr class="my-4 border-gray-200 dark:border-gray-700" />
        <div class="flex justify-between mb-8 text-lg">
          <span class="font-extrabold text-gray-900 dark:text-white">Order total:</span>
          <span class="font-extrabold text-gray-900 dark:text-white">${{ totalPrice.toFixed(2) }}</span>
        </div>
       
<router-link to="/checkout" class="block w-full text-center bg-[#FFC107] hover:bg-yellow-500 text-black py-3 rounded-md font-bold text-lg transition shadow-sm mb-4">
  Proceed to Checkout ❯
</router-link>
      </div>

    </div>
  </div>
</template>