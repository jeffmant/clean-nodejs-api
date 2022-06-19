import { AccountModel } from '../../../useCases/add-account/db-add-account.protocols'

export interface GetAccountByEmailRepository {
  getByEmail: (email: string) => Promise<AccountModel>
}
