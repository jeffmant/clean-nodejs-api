import env from '../config/env'
import { signinPatch, signupPatch } from './paths'
import { accountSchema, errorSchema, signinParamsSchema, signupParamsSchema } from './schemas'
import { badRequest, serverError, unauthenticated, unauthorized, notFound, forbidden } from './components'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean NodeJS API',
    description: 'NodeJS REST API using TDD, Clean Code, Clean Architecture, SOLID, and Typescript',
    version: `${env.API_VERSION[1]}.0.0`
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  contact: {
    name: 'Jefferson Mantovani',
    email: 'jgsmantovani@gmail.com',
    url: 'https://linkedin.com/in/jeffmant'
  },
  servers: [{
    url: `/api/${env.API_VERSION}`
  }],
  tags: [
    { name: 'Signin' },
    { name: 'Signup' }
  ],
  paths: {
    '/signin': signinPatch,
    '/signup': signupPatch
  },
  schemas: {
    account: accountSchema,
    'signin-params': signinParamsSchema,
    'signup-params': signupParamsSchema,
    error: errorSchema
  },
  components: {
    'bad-request': badRequest,
    'server-error': serverError,
    'not-found': notFound,
    unauthenticated,
    unauthorized,
    forbidden
  }
}
