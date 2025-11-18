// 使用者登入 API
import { db } from '~/server/database/db'
import { users } from '~/server/database/schema'
import { verifyPassword } from '~/server/utils/password'
import { signJWT } from '~/server/utils/jwt'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // 讀取請求資料
    const body = await readBody(event)
    const { email, password } = body

    // 驗證必填欄位
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: 'Email 和密碼為必填欄位',
      })
    }

    // 查詢使用者
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .get()

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Email 或密碼錯誤',
      })
    }

    // 驗證密碼
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        message: 'Email 或密碼錯誤',
      })
    }

    // 生成 JWT token
    const token = await signJWT({
      userId: user.id,
      email: user.email,
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
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        city: user.city,
        zipCode: user.zipCode,
        createdAt: user.createdAt,
      },
      token,
    }
  } catch (error: any) {
    // 處理錯誤
    if (error.statusCode) {
      throw error
    }

    console.error('登入錯誤:', error)
    throw createError({
      statusCode: 500,
      message: '登入失敗，請稍後再試',
    })
  }
})
