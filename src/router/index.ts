import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CartView from '../views/CartView.vue';
import LoginView from '../views/LoginView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import RegisterView from '../views/RegisterView.vue';
import InfoView from '../views/InfoView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { 
      path: '/', 
      name: 'home', 
      component: HomeView 
    },
    { 
      path: '/product/:id', 
      name: 'product-detail', 
      component: ProductDetailView 
    },
    { 
      path: '/cart', 
      name: 'cart', 
      component: CartView 
    },
    { 
      path: '/login', 
      name: 'login', 
      component: LoginView 
    },
    { 
      path: '/checkout', 
      name: 'checkout', 
      component: CheckoutView 
    },
    { 
      path: '/register', 
      name: 'register', 
      component: RegisterView 
    },
    { 
      path: '/about', 
      name: 'about', 
      component: InfoView 
    }
  ]
});

export default router;