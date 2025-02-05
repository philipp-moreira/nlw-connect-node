import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string(),

  // Redis
  REDIS_URL: z.string().url(),

  // JWT
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
