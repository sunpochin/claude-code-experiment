<template>
  <header class="header">
    <div class="container">
      <nav class="navbar">
        <NuxtLink to="/" class="logo">
          <h1>時尚服飾館</h1>
        </NuxtLink>

        <div class="nav-menu" :class="{ active: menuOpen }">
          <NuxtLink to="/" class="nav-link" @click="closeMenu">首頁</NuxtLink>
          <NuxtLink to="/products" class="nav-link" @click="closeMenu">所有商品</NuxtLink>
          <NuxtLink to="/products?category=男裝" class="nav-link" @click="closeMenu">男裝</NuxtLink>
          <NuxtLink to="/products?category=女裝" class="nav-link" @click="closeMenu">女裝</NuxtLink>
          <NuxtLink to="/products?category=童裝" class="nav-link" @click="closeMenu">童裝</NuxtLink>
        </div>

        <div class="nav-actions">
          <NuxtLink to="/cart" class="cart-icon">
            🛒
            <span v-if="cartStore.totalItems > 0" class="cart-badge">
              {{ cartStore.totalItems }}
            </span>
          </NuxtLink>
          <button class="menu-toggle" @click="toggleMenu" aria-label="選單">
            {{ menuOpen ? '✕' : '☰' }}
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}
</script>

<style scoped>
.header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo {
  text-decoration: none;
  color: white;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex: 1;
  justify-content: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cart-icon {
  position: relative;
  font-size: 1.5rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.cart-icon:hover {
  transform: scale(1.1);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background-color: var(--primary-color);
    flex-direction: column;
    padding: 1rem;
    gap: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .nav-menu.active {
    transform: translateX(0);
  }

  .nav-link {
    width: 100%;
    padding: 1rem;
    text-align: center;
  }
}
</style>
