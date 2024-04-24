import { env } from '~/services/env.server'
import type { StartBatchResponse } from '~/types'

export async function opprettRtvBrevSammenligning(
  accessToken: string,
  brevGruppe: string,
  brevKode: string,
  maksAntall: number,
  brukAutoBrev: boolean,
  startAutobrevId: number,
): Promise<StartBatchResponse> {
  const response = await fetch(
    `${env.penUrl}/api/brev/rtv-brev-sammenligning`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Request-ID': crypto.randomUUID(),
      },
      body: JSON.stringify({
        brevGruppe: brevGruppe,
        brevKode: brevKode,
        maksAntall: maksAntall,
        brukAutoBrev: brukAutoBrev,
        startAutobrevId: startAutobrevId,
      }),
    },
  )

  if (response.ok) {
    return (await response.json()) as StartBatchResponse
  } else {
    throw new Error()
  }
}

