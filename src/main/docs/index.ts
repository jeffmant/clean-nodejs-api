import env from '../config/env'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean NodeJS API',
    description: 'NodeJS REST API using TDD, Clean Code, Clean Architecture, SOLID, and Typescript',
    version: env.API_VERSION
  }
}
