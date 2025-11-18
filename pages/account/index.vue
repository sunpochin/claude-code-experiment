<template>
  <div class="account-page">
    <div class="container">
      <h1>會員中心</h1>

      <div v-if="authStore.isAuthenticated && authStore.user" class="account-content">
        <!-- 會員資訊卡片 -->
        <div class="info-card">
          <h2>個人資料</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">姓名</span>
              <span class="value">{{ authStore.user.name }}</span>
            </div>
            <div class="info-item">
              <span class="label">Email</span>
              <span class="value">{{ authStore.user.email }}</span>
            </div>
            <div class="info-item">
              <span class="label">電話</span>
              <span class="value">{{ authStore.user.phone || '尚未設定' }}</span>
            </div>
            <div class="info-item">
              <span class="label">地址</span>
              <span class="value">
                {{
                  authStore.user.address
                    ? `${authStore.user.city} ${authStore.user.zipCode} ${authStore.user.address}`
                    : '尚未設定'
                }}
              </span>
            </div>
            <div class="info-item">
              <span class="label">註冊日期</span>
              <span class="value">{{
                formatDate(authStore.user.createdAt)
              }}</span>
            </div>
          </div>
        </div>

        <!-- 功能選單 -->
        <div class="menu-grid">
          <NuxtLink to="/account/orders" class="menu-item">
            <div class="menu-icon">📦</div>
            <h3>訂單記錄</h3>
            <p>查看您的購買記錄</p>
          </NuxtLink>

          <NuxtLink to="/account/profile" class="menu-item">
            <div class="menu-icon">👤</div>
            <h3>編輯資料</h3>
            <p>修改個人資訊</p>
          </NuxtLink>

          <NuxtLink to="/account/addresses" class="menu-item">
            <div class="menu-icon">📍</div>
            <h3>收件地址</h3>
            <p>管理配送地址</p>
          </NuxtLink>

          <button @click="handleLogout" class="menu-item logout-item">
            <div class="menu-icon">🚪</div>
            <h3>登出</h3>
            <p>登出您的帳號</p>
          </button>
        </div>
      </div>

      <div v-else class="loading">
        載入中...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default',
  middleware: 'auth', // 需要登入才能訪問（稍後建立）
})

useSeoMeta({
  title: '會員中心 - 時尚服飾館',
  description: '管理您的個人資料、訂單記錄與收件地址',
})

const authStore = useAuthStore()
const router = useRouter()

// 在頁面載入時取得使用者資料
onMounted(async () => {
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser()

    // 如果還是未登入，導向登入頁
    if (!authStore.isAuthenticated) {
      router.push('/auth/login?redirect=/account')
    }
  }
})

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.account-page {
  min-height: calc(100vh - 200px);
  padding: 3rem 1rem;
  background: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
}

.account-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.info-card h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #e0e0e0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item .label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 600;
}

.info-item .value {
  font-size: 1rem;
  color: #333;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.menu-item {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  border: 2px solid transparent;
}

.menu-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--primary-color);
}

.menu-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.menu-item h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.menu-item p {
  color: #666;
  font-size: 0.9rem;
}

.logout-item {
  background: #fff5f5;
}

.logout-item:hover {
  border-color: #e53e3e;
}

.logout-item h3 {
  color: #e53e3e;
}

.loading {
  text-align: center;
  padding: 4rem;
  font-size: 1.25rem;
  color: #666;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>
