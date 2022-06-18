import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise((resolve) => resolve('any_token'))
  }
}))

describe('JWT Adapter', () => {
  it('Should call witch correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  it('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  it('Should throw when sign throws', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign') as unknown as jest.Mock<
    ReturnType<(key: string) => Promise<string>>,
    Parameters<(key: string) => Promise<string>>>
    signSpy.mockResolvedValueOnce(new Promise((_resolve, reject) => reject(new Error())))
    const promise = sut.encrypt('any_id')
    await expect(promise).rejects.toThrow()
  })
})
