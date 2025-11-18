// 資料庫連線設定
import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import { join } from 'path'

// 建立 SQLite 資料庫連線
const sqlite = new Database(join(process.cwd(), 'dev.db'))

// 建立 Drizzle 實例
export const db = drizzle(sqlite, { schema })

// 確保在應用程式關閉時關閉資料庫連線
process.on('exit', () => sqlite.close())
process.on('SIGINT', () => {
  sqlite.close()
  process.exit(0)
})
