<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h1>會員登入</h1>
        <p class="subtitle">歡迎回來！請登入您的帳號</p>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">密碼</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="請輸入密碼"
              required
            />
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn-primary" :disabled="authStore.loading">
            {{ authStore.loading ? '登入中...' : '登入' }}
          </button>
        </form>

        <div class="auth-footer">
          還沒有帳號？
          <NuxtLink to="/auth/register">立即註冊</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: '會員登入 - 時尚服飾館',
  description: '登入您的時尚服飾館帳號',
})

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const formData = reactive({
  email: '',
  password: '',
})

const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''

  // 呼叫登入 API
  const result = await authStore.login(formData.email, formData.password)

  if (result.success) {
    // 登入成功，導向原本要去的頁面或首頁
    const redirect = route.query.redirect as string
    router.push(redirect || '/')
  } else {
    errorMessage.value = result.message || '登入失敗，請稍後再試'
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-container {
  width: 100%;
  max-width: 480px;
}

.auth-card {
  background: white;
  border-radius: 12px;
  padding: 3rem 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.auth-card h1 {
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.form-group input {
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.875rem;
  border-radius: 8px;
  font-size: 0.9rem;
  border-left: 4px solid #c33;
}

.btn-primary {
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 0.5rem;
}

.btn-primary:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  color: #666;
}

.auth-footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
}

.auth-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .auth-card {
    padding: 2rem 1.5rem;
  }

  .auth-card h1 {
    font-size: 1.5rem;
  }
}
</style>
