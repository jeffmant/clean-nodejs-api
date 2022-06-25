import { DbAuthentication } from '@src/data/useCases/authentication/db-authentication'
import { Authentication } from '@src/domain/useCases/authentication'
import { BcryptAdapter } from '@src/infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@src/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@src/infra/db/mongodb/account/account-mongo.repository'
import env from '@src/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12

  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)

  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}
