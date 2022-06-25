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
        $ref: '#/components/bad-request'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/not-found'
      },
      500: {
        $ref: '#/components/server-error'
      }
    }
  }
}
