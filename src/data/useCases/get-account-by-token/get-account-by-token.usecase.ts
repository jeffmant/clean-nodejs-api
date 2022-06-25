import { GetAccountByToken, Decrypter, AccountModel, GetAccountByTokenRepository } from './get-account-by-token.protocols'

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
