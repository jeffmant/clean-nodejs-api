import { GetAccountByToken } from '../../../domain/useCases/getAccountByToken'
import { Decrypter } from '../../protocols/criptography/decrypter'
import { AccountModel } from '../add-account/db-add-account.protocols'

export class DbGetAccountByToken implements GetAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async get (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return await new Promise(resolve => resolve(null))
  }
}
