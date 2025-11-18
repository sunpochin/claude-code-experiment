// Drizzle ORM Schema for 時尚服飾館
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { sql } from 'drizzle-orm'

// 使用者資料表
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(), // bcrypt 加密後的密碼
  name: text('name').notNull(),
  phone: text('phone'),

  // 收件地址資訊
  address: text('address'),
  city: text('city'),
  zipCode: text('zip_code'),

  // 系統欄位
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// TypeScript 類型推導
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
