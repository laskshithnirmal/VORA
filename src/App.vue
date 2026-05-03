<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue'; 
</script>

<template>
  <!-- flex &flex-col -->
  <div class="min-h-screen bg-gray-50 dark:bg-[#0f172a] font-sans transition-colors duration-300 flex flex-col">
    
    <NavBar />
    
    <!-- flex-grow , Footer  -->
    <main class="container mx-auto p-4 mt-6 flex-grow">
      <router-view></router-view>
    </main>
    
    <!--  Footer  -->
    <Footer />
    
  </div>
</template>