import type { StartBatchResponse } from '~/types'
import { env } from '~/services/env.server'

type StartUttrekkRequest = {
  fil : File
}

export async function opprettOmsorgsopptjeningUttrekk(
  accessToken: string,
  bestilling: StartUttrekkRequest,
): Promise<StartBatchResponse> {

  const response = await fetch(
    `${env.penUrl}/api/omsorgsopptjening/uttrekk/opprett`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Request-ID': crypto.randomUUID(),
      },
      body: JSON.stringify(bestilling),
    },
  )

  if (response.ok) {
    return (await response.json()) as StartBatchResponse
  } else {
    throw new Error()
  }
}

