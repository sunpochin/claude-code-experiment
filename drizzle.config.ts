import type { Config } from 'drizzle-kit'

export default {
  schema: './server/database/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './dev.db',
  },
} satisfies Config
