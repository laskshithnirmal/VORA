<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useProductStore } from '../stores/products';
import { useSearchStore } from '../stores/search';

const productStore = useProductStore();
const searchStore = useSearchStore();

const categories = ['All Categories', 'beauty', 'fragrances', 'furniture', 'groceries'];
const selectedCategory = ref('All Categories');

const filteredProducts = computed(() => {
  let result = productStore.items; // Store data 

  if (selectedCategory.value !== 'All Categories') {
    result = result.filter(p => p.category === selectedCategory.value);
  }

  if (searchStore.searchQuery.trim() !== '') {
    const query = searchStore.searchQuery.toLowerCase();
    result = result.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    );
  }
  return result;
});

onMounted(() => {
  productStore.fetchProducts(); // Store function call 
});
</script>

<template>
  <div>
    <!-- Shop by Category-->
    <div class="mb-8">
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
      <div class="flex flex-wrap gap-3">
        <!-- Categories  -->
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          :class="[
            'px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border capitalize',
            selectedCategory === cat 
              ? 'bg-[#FFC107] border-[#FFC107] text-black shadow-md' 
              : 'bg-white dark:bg-[#1e293b] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#FFC107] dark:hover:border-[#FFC107]'
          ]"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Featured Products මාතෘකාව -->
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Products</h2>

    <!-- loading -->
    <div v-if="loading" class="text-center py-20">
      <p class="text-xl text-gray-600 dark:text-gray-300 animate-pulse">Products are loading... ⏳</p>
    </div>

    <!-- The section that is displayed if an error occurs. -->
    <div v-else-if="error" class="text-center py-20 text-red-500">
      <p class="text-xl">⚠️ {{ error }}</p>
    </div>

    <!-- Filter කළ Products Grid එක -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id" 
        :product="product" 
      />
    </div>
    
    <!--Message displayed if there are no products in the selected Category or Search. -->
    <div v-if="!loading && filteredProducts.length === 0" class="text-center py-20">
      <p class="text-gray-500 dark:text-gray-400">ඔබ සෙවූ භාණ්ඩය හමු නොවීය.</p>
    </div>
  </div>
</template>