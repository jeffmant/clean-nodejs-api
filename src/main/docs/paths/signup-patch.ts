export const signupPatch = {
  post: {
    tags: ['Signup'],
    summary: 'Register User',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/signup-params'
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
      403: {
        $ref: '#/components/forbidden'
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
