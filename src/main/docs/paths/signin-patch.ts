export const signinPatch = {
  post: {
    tags: ['Authentication'],
    summary: 'API to Authenticate User',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signin-params'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      },
      400: {
        description: 'Bad Request'
      },
      401: {
        description: 'Unauthorized'
      },
      403: {
        description: 'Unauthenticated'
      }
    }
  }
}
