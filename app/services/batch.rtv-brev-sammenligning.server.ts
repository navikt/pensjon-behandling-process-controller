import { env } from '~/services/env.server'
import type { StartBatchResponse } from '~/types'

type AutobrevBestilling = {
  autobrev: {
    brevGruppe: string,
    brevKode: string | null | undefined,
    maksAntall: number,
    startAutobrevId: number,
  }
}

type VedtakBestilling = {
  vedtak: {
    ar: number,
    brevGruppe: string,
    maksAntall: number,
    sakType: string[],
    vedtakType: string[],
  }
}

export async function opprettRtvBrevSammenligning(
  accessToken: string,
  bestilling: AutobrevBestilling | VedtakBestilling,
): Promise<StartBatchResponse> {
  console.log("bestilling", bestilling)

  const response = await fetch(
    `${env.penUrl}/api/brev/rtv-brev-sammenligning`,
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

