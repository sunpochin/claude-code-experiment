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
          <!-- 使用者選單 -->
          <div v-if="authStore.isAuthenticated" class="user-menu">
            <button @click="toggleUserMenu" class="user-button">
              👤 {{ authStore.user?.name }}
            </button>
            <div v-if="userMenuOpen" class="user-dropdown">
              <NuxtLink to="/account" class="dropdown-item" @click="closeUserMenu">
                會員中心
              </NuxtLink>
              <NuxtLink to="/account/orders" class="dropdown-item" @click="closeUserMenu">
                訂單記錄
              </NuxtLink>
              <button @click="handleLogout" class="dropdown-item logout">
                登出
              </button>
            </div>
          </div>
          <NuxtLink v-else to="/auth/login" class="login-button">
            登入
          </NuxtLink>

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
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)
const userMenuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value
}

const closeUserMenu = () => {
  userMenuOpen.value = false
}

const handleLogout = async () => {
  await authStore.logout()
  closeUserMenu()
  router.push('/')
}

// 在頁面載入時檢查登入狀態
onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser()
  }
})

// 點擊外部關閉下拉選單
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.user-menu')) {
      userMenuOpen.value = false
    }
  })
})
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

.user-menu {
  position: relative;
}

.user-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  overflow: hidden;
  z-index: 1001;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.875rem 1.25rem;
  text-align: left;
  text-decoration: none;
  color: #333;
  background: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.dropdown-item.logout {
  color: #e53e3e;
  border-top: 1px solid #eee;
}

.dropdown-item.logout:hover {
  background: #fff5f5;
}

.login-button {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s;
  display: inline-block;
}

.login-button:hover {
  background: rgba(255, 255, 255, 0.2);
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
