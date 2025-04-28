import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import env from './env.js'
import { cors } from 'hono/cors'

const app = new Hono()

const allowedOrigins = env.ALLOWED_ORIGINS?.split(',') || []

// Add CORS middleware for all routes
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (allowedOrigins.includes(origin)) {
        return origin
      }
      return allowedOrigins[0] // Default to first allowed origin
    },
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
