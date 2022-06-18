import { AccountModel } from '../../useCases/add-account/db-add-account-protocols'

export interface LoadAccountByEmailRepository {
  getByEmail: (email: string) => Promise<AccountModel>
}
