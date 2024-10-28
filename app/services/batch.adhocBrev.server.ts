import { env } from '~/services/env.server'
import type { StartBatchResponse } from '~/types'

export async function opprettAdhocBrevBehandling(
  accessToken: string,
  internBatchBrevkode: string,
): Promise<StartBatchResponse> {

  const body: any = {
    internBatchBrevkode: internBatchBrevkode,
  }

  const response = await fetch(
    `${env.penUrl}/api/brev/adhoc/start`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Request-ID': crypto.randomUUID(),
      },
      body: JSON.stringify(body),
    },
  )

  if (response.ok) {
    return (await response.json()) as StartBatchResponse
  } else {
    throw new Error()
  }
}

