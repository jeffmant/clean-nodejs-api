import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT ?? '7000',
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://localhost:27017/clean-node-api',
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret'
}
