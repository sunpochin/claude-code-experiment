// 使用者註冊 API
import { db } from '~/server/database/db'
import { users } from '~/server/database/schema'
import { hashPassword } from '~/server/utils/password'
import { signJWT } from '~/server/utils/jwt'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // 讀取請求資料
    const body = await readBody(event)
    const { email, password, name, phone } = body

    // 驗證必填欄位
    if (!email || !password || !name) {
      throw createError({
        statusCode: 400,
        message: 'Email、密碼和姓名為必填欄位',
      })
    }

    // 驗證 email 格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw createError({
        statusCode: 400,
        message: 'Email 格式不正確',
      })
    }

    // 驗證密碼長度
    if (password.length < 6) {
      throw createError({
        statusCode: 400,
        message: '密碼長度至少需要 6 個字元',
      })
    }

    // 檢查 email 是否已被註冊
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get()

    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: '此 Email 已被註冊',
      })
    }

    // 加密密碼
    const hashedPassword = await hashPassword(password)

    // 建立新使用者
    const newUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        name,
        phone: phone || null,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        phone: users.phone,
        createdAt: users.createdAt,
      })
      .get()

    // 生成 JWT token
    const token = await signJWT({
      userId: newUser.id,
      email: newUser.email,
    })

    // 設定 HTTP-only cookie
    setCookie(event, 'auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 天
      path: '/',
    })

    // 返回使用者資料（不包含密碼）
    return {
      success: true,
      user: newUser,
      token,
    }
  } catch (error: any) {
    // 處理錯誤
    if (error.statusCode) {
      throw error
    }

    console.error('註冊錯誤:', error)
    throw createError({
      statusCode: 500,
      message: '註冊失敗，請稍後再試',
    })
  }
})
