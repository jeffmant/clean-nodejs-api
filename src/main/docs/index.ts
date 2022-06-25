import env from '../config/env'
import { signinPatch } from './paths/signin-patch'
import { accountSchema } from './schemas/account.schema'
import { signinParamsSchema } from './schemas/signin-params.schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean NodeJS API',
    description: 'NodeJS REST API using TDD, Clean Code, Clean Architecture, SOLID, and Typescript',
    version: `${env.API_VERSION[1]}.0.0`
  },
  servers: [{
    url: `/api/${env.API_VERSION}`
  }],
  tags: [{
    name: 'Authentication'
  }],
  paths: {
    '/signin': signinPatch
  },
  schemas: {
    account: accountSchema,
    'signin-params': signinParamsSchema
  }
}
