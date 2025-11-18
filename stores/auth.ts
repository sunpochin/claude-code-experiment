// Auth Store - 管理使用者認證狀態
import { defineStore } from 'pinia'

export interface User {
  id: number
  email: string
  name: string
  phone?: string
  address?: string
  city?: string
  zipCode?: string
  createdAt: Date
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    loading: false,
  }),

  actions: {
    // 註冊
    async register(data: {
      email: string
      password: string
      name: string
      phone?: string
    }) {
      this.loading = true
      try {
        const response = await $fetch('/api/auth/register', {
          method: 'POST',
          body: data,
        })

        if (response.success) {
          this.user = response.user
          this.isAuthenticated = true
          return { success: true }
        }
      } catch (error: any) {
        console.error('註冊失敗:', error)
        return {
          success: false,
          message: error.data?.message || '註冊失敗，請稍後再試',
        }
      } finally {
        this.loading = false
      }
    },

    // 登入
    async login(email: string, password: string) {
      this.loading = true
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password },
        })

        if (response.success) {
          this.user = response.user
          this.isAuthenticated = true
          return { success: true }
        }
      } catch (error: any) {
        console.error('登入失敗:', error)
        return {
          success: false,
          message: error.data?.message || '登入失敗，請稍後再試',
        }
      } finally {
        this.loading = false
      }
    },

    // 登出
    async logout() {
      try {
        await $fetch('/api/auth/logout', {
          method: 'POST',
        })

        this.user = null
        this.isAuthenticated = false
      } catch (error) {
        console.error('登出失敗:', error)
      }
    },

    // 取得當前使用者資訊
    async fetchUser() {
      try {
        const response = await $fetch('/api/auth/me')

        if (response.success) {
          this.user = response.user
          this.isAuthenticated = true
        }
      } catch (error) {
        // Token 無效或已過期
        this.user = null
        this.isAuthenticated = false
      }
    },
  },
})
