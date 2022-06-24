import { AccountModel } from '../models/account.model'

export interface GetAccountByToken {
  get: (accessToken: string, role?: string) => Promise<AccountModel>
}
