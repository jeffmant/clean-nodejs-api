import { Router } from 'express'
import { routeAdapter } from '../../adapters/express/express-route.adapter'
import { makeSigninController } from '../../factories/controllers/signin/signin-controller.factory'
import { makeSignupController } from '../../factories/controllers/signup/signup-controller.factory'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignupController()))
  router.post('/signin', routeAdapter(makeSigninController()))
}
