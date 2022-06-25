export const unauthenticated = {
  description: 'Unauthenticated',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
