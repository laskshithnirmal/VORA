<template>
  <footer class="bg-[#111827] text-white pt-14 pb-8 mt-16 w-full">
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      <!-- 1 column -->
      <div>
        <h3 class="font-bold text-lg mb-5 tracking-wide">Get to Know Us</h3>
        <ul class="space-y-3 text-sm text-gray-300 font-medium">
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Careers</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Blog</a></li>
          <li><router-link to="/about" class="hover:text-yellow-400 hover:underline transition">About VORA</router-link></li>
        </ul>
      </div>

      <!-- 2 column -->
      <div>
        <h3 class="font-bold text-lg mb-5 tracking-wide">Make Money with Us</h3>
        <ul class="space-y-3 text-sm text-gray-300 font-medium">
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Sell products on GROOKS</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Become an Affiliate</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Advertise Your Products</a></li>
        </ul>
      </div>

      <!-- 3 column -->
      <div>
        <h3 class="font-bold text-lg mb-5 tracking-wide">GROOKS Payment Products</h3>
        <ul class="space-y-3 text-sm text-gray-300 font-medium">
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">VORA Business Card</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Shop with Points</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Reload Your Balance</a></li>
        </ul>
      </div>

      <!-- 4 column -->
      <div>
        <h3 class="font-bold text-lg mb-5 tracking-wide">Let Us Help You</h3>
        <ul class="space-y-3 text-sm text-gray-300 font-medium">
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Your Account</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Your Orders</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Shipping Rates & Policies</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Returns & Replacements</a></li>
          <li><a href="#" class="hover:text-yellow-400 hover:underline transition">Help</a></li>
        </ul>
      </div>

    </div>

    <!--  Copyright  -->
    <div class="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
      <p>&copy; 2026 GROOKS PVT LTD. All rights reserved.</p>
      <div class="flex gap-6 font-medium">
        <a href="#" class="hover:text-white transition">Conditions of Use</a>
        <a href="#" class="hover:text-white transition">Privacy Notice</a>
      </div>
    </div>
  </footer>
</template>