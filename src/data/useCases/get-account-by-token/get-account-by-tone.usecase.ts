import { GetAccountByToken } from '../../../domain/useCases/getAccountByToken'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account.protocols'
import { GetAccountByTokenRepository } from '../../protocols/db/account/get-account-by-token.repository'

export class DbGetAccountByToken implements GetAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly getAccountByTokenRepository: GetAccountByTokenRepository
  ) {}

  async get (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.getAccountByTokenRepository.getByToken(accessToken, role)
      if (account) return account
    }
    return await new Promise(resolve => resolve(null))
  }
}
