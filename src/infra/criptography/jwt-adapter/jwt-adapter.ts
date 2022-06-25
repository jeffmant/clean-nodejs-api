import jwt from 'jsonwebtoken'
import { Decrypter } from '@src/data/protocols/criptography/decrypter'
import { Encrypter } from '@src/data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    const decodedToken: any = await jwt.verify(value, this.secret)
    return decodedToken
  }
}
