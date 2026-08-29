import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import config from './payload.config'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET

if (!PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is required')
}

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: PAYLOAD_SECRET,
    config,
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    console.log(`Payload Admin: http://localhost:${PORT}/admin`)
  })
}

start()
