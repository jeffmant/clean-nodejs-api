export interface UpdateAccessTokenRepository {
  update: (id: string, accessToken: string) => Promise<void>
}
