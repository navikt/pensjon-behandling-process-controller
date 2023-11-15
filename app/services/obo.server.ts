import { env } from '~/services/env.server'

export type OnBehalfOfTokenResponse = {
  token_type: string
  scope: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export async function exchange(assertion: String, scope: string) {
  let details = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    client_id: env.clientId,
    client_secret: env.clientSecret,
    assertion: assertion,
    scope: scope,
    requested_token_use: 'on_behalf_of',
  }

  let formBody: string[] = []
  for (const [k, v] of Object.entries(details)) {
    let encodedKey = encodeURIComponent(k)
    let encodedValue = encodeURIComponent(v.toString())
    formBody.push(encodedKey + '=' + encodedValue)
  }

  const response = await fetch(env.tokenEnpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody.join('&'),
  })

  if (response.ok) {
    return (await response.json()) as OnBehalfOfTokenResponse
  } else {
    throw new Error(await response.text())
  }
}
