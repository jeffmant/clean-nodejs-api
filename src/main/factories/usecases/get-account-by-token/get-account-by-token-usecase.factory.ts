import { DbGetAccountByToken } from '@src/data/useCases/get-account-by-token/get-account-by-tone.usecase'
import { GetAccountByToken } from '@src/domain/useCases/getAccountByToken'
import { JwtAdapter } from '@src/infra/criptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from '@src/infra/db/mongodb/account/account-mongo.repository'
import env from '@src/main/config/env'

export const makeDbGetAccountByToken = (): GetAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbGetAccountByToken(jwtAdapter, accountMongoRepository)
}
