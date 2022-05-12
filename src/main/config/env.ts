export default {
  PORT: process.env.port ?? '5050',
  MONGO_URL: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api'
}
