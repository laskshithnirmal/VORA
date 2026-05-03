<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cart';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const { items, totalPrice, totalItems } = storeToRefs(cartStore);
const router = useRouter();

// Payment method 
const selectedPayment = ref('card');

// Calculating Tax and Discount (as in the picture)
const tax = computed(() => totalPrice.value * 0.08); // 8% Tax
const discount = ref(10.00); //$10 discount
const finalTotal = computed(() => totalPrice.value + tax.value - discount.value);

const handlePlaceOrder = () => {
  alert('🎉 Your order has been placed successfully!');
  cartStore.items = []; // Emptying the Cart
  router.push('/'); // Sending to Home
};
</script>

<template>
  <div class="max-w-6xl mx-auto py-8">
    <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!--Left: Form (Shipping & Payment) -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- 1. Shipping Address -->
        <div class="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-[#FFC107] text-black font-bold flex items-center justify-center text-lg">1</div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">First Name</label>
              <input type="text" placeholder="Enter first name" class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Last Name</label>
              <input type="text" placeholder="Enter last name" class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Address Line 1</label>
              <input type="text" placeholder="Street address, P.O. box" class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">City / District</label>
              <input type="text" placeholder="City" class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
            <div>
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Postal Code</label>
              <input type="text" placeholder="XXXXXX" class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Phone Number</label>
              <div class="flex">
                <span class="px-4 py-2.5 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300">+1</span>
                <input type="text" placeholder="Enter phone number" class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-r-md bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-400 outline-none" />
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Payment Method -->
        <div class="bg-white dark:bg-[#1e293b] p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-8 h-8 rounded-full bg-[#FFC107] text-black font-bold flex items-center justify-center text-lg">2</div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
          </div>

          <div class="space-y-4">
            <!-- Credit Card Option -->
            <div @click="selectedPayment = 'card'" :class="['border rounded-lg p-4 cursor-pointer transition', selectedPayment === 'card' ? 'border-[#FFC107] bg-yellow-50/10' : 'border-gray-200 dark:border-gray-700']">
              <div class="flex items-center gap-3 font-bold text-gray-900 dark:text-white mb-4">
                <input type="radio" :checked="selectedPayment === 'card'" class="w-4 h-4 text-yellow-400 focus:ring-yellow-400" />
                Credit or Debit Card 💳
              </div>
              
              <div v-if="selectedPayment === 'card'" class="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                <div class="md:col-span-2">
                  <label class="block text-xs text-gray-500 mb-1">Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none" />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">Expiry Date</label>
                  <input type="text" placeholder="MM / YY" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none" />
                </div>
                <div>
                  <label class="block text-xs text-gray-500 mb-1">CVC</label>
                  <input type="password" placeholder="***" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none" />
                </div>
              </div>
            </div>

            <!-- Bank Transfer Option -->
            <div @click="selectedPayment = 'bank'" :class="['border rounded-lg p-4 cursor-pointer transition flex items-center justify-between', selectedPayment === 'bank' ? 'border-[#FFC107] bg-yellow-50/10' : 'border-gray-200 dark:border-gray-700']">
              <div class="flex items-center gap-3 font-bold text-gray-900 dark:text-white">
                <input type="radio" :checked="selectedPayment === 'bank'" class="w-4 h-4 text-yellow-400" />
                Direct Bank Transfer
              </div>
              <span class="text-gray-500 text-xl">🏦</span>
            </div>

            <!-- COD Option -->
            <div @click="selectedPayment = 'cod'" :class="['border rounded-lg p-4 cursor-pointer transition flex items-center justify-between', selectedPayment === 'cod' ? 'border-[#FFC107] bg-yellow-50/10' : 'border-gray-200 dark:border-gray-700']">
              <div class="flex items-center gap-3 font-bold text-gray-900 dark:text-white">
                <input type="radio" :checked="selectedPayment === 'cod'" class="w-4 h-4 text-yellow-400" />
                Cash on Delivery (COD)
              </div>
              <span class="text-gray-500 text-xl">💵</span>
            </div>
          </div>
        </div>
      </div>

      <!--Right: Order Summary & Review Items -->
      <div class="space-y-6">
        
        <!-- Summary Box -->
        <div class="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <button @click="handlePlaceOrder" class="w-full bg-[#FFC107] hover:bg-yellow-500 text-black py-3 rounded-md font-bold text-lg transition shadow-sm mb-4">
            Place your order ➔
          </button>
          <p class="text-xs text-center text-gray-500 dark:text-gray-400 mb-6">
            By placing your order, you agree to GROOKS's privacy notice and conditions of use.
          </p>

          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
          <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <div class="flex justify-between">
              <span>Items ({{ totalItems }}):</span>
              <span>${{ totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping & handling:</span>
              <span>$0.00</span>
            </div>
            <div class="flex justify-between">
              <span>Estimated tax:</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-red-500 font-medium">
              <span>Promotion Applied:</span>
              <span>-${{ discount.toFixed(2) }}</span>
            </div>
          </div>
          <hr class="my-4 border-gray-200 dark:border-gray-700" />
          <div class="flex justify-between items-center">
            <span class="font-extrabold text-xl text-gray-900 dark:text-white">Order total:</span>
            <span class="font-extrabold text-2xl text-yellow-500">${{ finalTotal > 0 ? finalTotal.toFixed(2) : '0.00' }}</span>
          </div>
        </div>

        <!-- Review Items Box -->
        <div class="bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <h3 class="font-bold text-gray-900 dark:text-white mb-4">Review items</h3>
          
          <div class="space-y-4 max-h-64 overflow-y-auto pr-2">
            <div v-for="item in items" :key="item.product.id" class="flex gap-4 border-b border-gray-100 dark:border-gray-700 pb-4 last:border-0 last:pb-0">
              <div class="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-md p-1 flex-shrink-0">
                <img :src="item.product.thumbnail" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
              </div>
              <div>
                <h4 class="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">{{ item.product.title }}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Qty: {{ item.quantity }}</p>
                <p class="text-sm font-bold text-yellow-600 dark:text-yellow-500 mt-1">${{ item.product.price.toFixed(2) }}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>