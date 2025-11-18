// 密碼加密工具函數
import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

// 加密密碼
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

// 驗證密碼
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}
