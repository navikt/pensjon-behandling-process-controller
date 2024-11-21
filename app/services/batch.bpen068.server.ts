import { env } from '~/services/env.server'
import type { StartBatchResponse } from '~/types'

export async function startRegulering(
  accessToken: string,
  satsDato: string,
  reguleringsDato: string,
  sisteAktivitet: string,
  maxFamiliebehandlinger: string,
): Promise<StartBatchResponse> {

  const body: any = {
      satsDato: satsDato,
      reguleringsDato: reguleringsDato,
  }

  if(sisteAktivitet !== ''){
    body.sisteAktivitet = sisteAktivitet;
  }
  if(maxFamiliebehandlinger !== ''){
    body.maxFamiliebehandlinger = maxFamiliebehandlinger;
  }

  const response = await fetch(
    `${env.penUrl}/api/vedtak/regulering/start`,
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

