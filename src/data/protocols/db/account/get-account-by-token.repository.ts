import { AccountModel } from '../../../useCases/add-account/db-add-account.protocols'

export interface GetAccountByTokenRepository {
  getByToken: (token: string, role?: string) => Promise<AccountModel>
}
