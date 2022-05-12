import { Router } from 'express'
import { routeAdapter } from '../adapters/express-route-adapter'
import { makeSignupController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignupController()))
}
