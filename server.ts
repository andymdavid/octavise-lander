import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '6a135f398d8ab4f0fde21b33346053fbc697b7954702f6ef1546a3bf9f2f8f67',
    mongoURL: process.env.MONGODB_URI || 'mongodb://localhost/octavise',
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
