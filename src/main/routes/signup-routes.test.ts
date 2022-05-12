import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', () => {
  test('Should return an account with success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'valid_name',
        email: 'valid_email@test.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      })
      .expect(200)
  })
})
