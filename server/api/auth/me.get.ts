// 取得當前登入使用者資訊 API
import { db } from '~/server/database/db'
import { users } from '~/server/database/schema'
import { verifyJWT } from '~/server/utils/jwt'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  try {
    // 從 cookie 取得 token
    const token = getCookie(event, 'auth_token')

    if (!token) {
      throw createError({
        statusCode: 401,
        message: '未登入',
      })
    }

    // 驗證 token
    const payload = await verifyJWT(token)

    if (!payload) {
      throw createError({
        statusCode: 401,
        message: 'Token 無效或已過期',
      })
    }

    // 查詢使用者資料
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        phone: users.phone,
        address: users.address,
        city: users.city,
        zipCode: users.zipCode,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, payload.userId))
      .get()

    if (!user) {
      throw createError({
        statusCode: 404,
        message: '使用者不存在',
      })
    }

    return {
      success: true,
      user,
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('取得使用者資訊錯誤:', error)
    throw createError({
      statusCode: 500,
      message: '取得使用者資訊失敗',
    })
  }
})
