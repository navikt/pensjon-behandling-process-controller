import { env } from '~/services/env.server'
import { StartBatchResponse } from '~/types'

export async function opprettBpen096(
  accessToken: string,
): Promise<StartBatchResponse> {
  const response = await fetch(
    `${env.penUrl}/api/hentSkattehendelser`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Request-ID': crypto.randomUUID(),
      },
    },
  )

  if (response.ok) {
    return (await response.json()) as StartBatchResponse
  } else {
    throw new Error()
  }
}
