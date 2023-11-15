import { ensureEnv } from '~/common/utils'

export const env = ensureEnv({
  callbackUrl: 'AZURE_CALLBACK_URL',
  clientId: 'AZURE_APP_CLIENT_ID',
  clientSecret: 'AZURE_APP_CLIENT_SECRET',
  issuer: 'AZURE_OPENID_CONFIG_ISSUER',
  tokenEnpoint: 'AZURE_OPENID_CONFIG_TOKEN_ENDPOINT',

  penScope: 'PEN_SCOPE',
  penUrl: 'PEN_URL',
})
