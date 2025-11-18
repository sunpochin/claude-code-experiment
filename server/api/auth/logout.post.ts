// 使用者登出 API
export default defineEventHandler(async (event) => {
  // 清除 auth_token cookie
  deleteCookie(event, 'auth_token', {
    path: '/',
  })

  return {
    success: true,
    message: '登出成功',
  }
})
