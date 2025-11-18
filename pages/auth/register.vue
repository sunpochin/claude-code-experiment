<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-card">
        <h1>會員註冊</h1>
        <p class="subtitle">建立您的帳號，開始購物體驗</p>

        <form @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label for="name">姓名 *</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              placeholder="請輸入您的姓名"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">密碼 *</label>
            <input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="至少 6 個字元"
              required
            />
          </div>

          <div class="form-group">
            <label for="confirmPassword">確認密碼 *</label>
            <input
              id="confirmPassword"
              v-model="formData.confirmPassword"
              type="password"
              placeholder="請再次輸入密碼"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">電話</label>
            <input
              id="phone"
              v-model="formData.phone"
              type="tel"
              placeholder="0912345678"
            />
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn-primary" :disabled="authStore.loading">
            {{ authStore.loading ? '註冊中...' : '註冊' }}
          </button>
        </form>

        <div class="auth-footer">
          已有帳號？
          <NuxtLink to="/auth/login">立即登入</NuxtLink>
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
  title: '會員註冊 - 時尚服飾館',
  description: '註冊成為時尚服飾館會員，享受專屬優惠與購物體驗',
})

const authStore = useAuthStore()
const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
})

const errorMessage = ref('')

const handleRegister = async () => {
  errorMessage.value = ''

  // 驗證密碼
  if (formData.password !== formData.confirmPassword) {
    errorMessage.value = '兩次輸入的密碼不一致'
    return
  }

  if (formData.password.length < 6) {
    errorMessage.value = '密碼長度至少需要 6 個字元'
    return
  }

  // 呼叫註冊 API
  const result = await authStore.register({
    email: formData.email,
    password: formData.password,
    name: formData.name,
    phone: formData.phone || undefined,
  })

  if (result.success) {
    // 註冊成功，導向首頁
    router.push('/')
  } else {
    errorMessage.value = result.message || '註冊失敗，請稍後再試'
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
