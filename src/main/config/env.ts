import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: Number(process.env.PORT) ?? 7000,
  API_VERSION: String(process.env.API_VERSION) ?? 'v1',
  MONGO_URL: String(process.env.MONGO_URL) ?? 'mongodb://localhost:27017/clean-node-ts-api',
  JWT_SECRET: String(process.env.JWT_SECRET) ?? 'secret'
}
