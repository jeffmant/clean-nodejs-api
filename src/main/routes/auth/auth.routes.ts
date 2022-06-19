import { Router } from 'express'
import { routeAdapter } from '../../adapters/express/express-route.adapter'
import { makeSigninController } from '../../factories/signin/signin.factory'
import { makeSignupController } from '../../factories/signup/signup.factory'

export default (router: Router): void => {
  router.post('/signup', routeAdapter(makeSignupController()))
  router.post('/signin', routeAdapter(makeSigninController()))
}
