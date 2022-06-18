export interface UpdateAccessTokenRepository {
  updateAccessToken: (id: string, accessToken: string) => Promise<void>
}
