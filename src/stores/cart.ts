import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Product } from '../types';

// Cart 
export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  // Adding an item to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    const existingItem = items.value.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.value.push({ product, quantity });
    }
  };

  //Removing an item from the cart
  const removeFromCart = (productId: number) => {
    items.value = items.value.filter(item => item.product.id !== productId);
  };

  // Calculating the total number of items and total price
  const totalItems = computed(() => items.value.reduce((total, item) => total + item.quantity, 0));
  const totalPrice = computed(() => items.value.reduce((total, item) => total + (item.product.price * item.quantity), 0));

  return { items, addToCart, removeFromCart, totalItems, totalPrice };
});