import { env } from '~/services/env.server'
import type { StartBatchResponse } from '~/types'

export async function opprettBpen006(
  accessToken: string,
  behandlingsmaned: number,
): Promise<StartBatchResponse> {
  const response = await fetch(
    `${env.penUrl}/api/aldersovergang/batch`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Request-ID': crypto.randomUUID(),
      },
      body: JSON.stringify({
        behandlingsmaned: behandlingsmaned,
      }),
    },
  )

  if (response.ok) {
    return (await response.json()) as StartBatchResponse
  } else {
    throw new Error()
  }
}

