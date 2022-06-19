export default {
  PORT: process.env.PORT ?? '5050',
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://docker:mongopw@localhost:55004',
  JWT_SECRET: process.env.JWT_SECRET ?? 'DJE*92==king-dom'
}
