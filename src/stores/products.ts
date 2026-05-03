import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Product, ProductResponse } from '../types';

export const useProductStore = defineStore('products', () => {
  const items = ref<Product[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) throw new Error('Failed to fetch products');
      const data: ProductResponse = await response.json();
      items.value = data.products;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  return { items, loading, error, fetchProducts };
});