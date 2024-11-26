import { env } from '~/services/env.server'
import { FortsettBatchResponse, StartBatchResponse } from '~/types'

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

export async function fortsettBehandling(
  accessToken: string,
  behandlingIdFamilie: string,
  fortsettTilAktivitet: string,
): Promise<StartBatchResponse> {

  const body: any = {
    behandlingIdFamilie: behandlingIdFamilie,
    fortsettTilAktivitet: fortsettTilAktivitet,
  }

  const response = await fetch(
    `${env.penUrl}/api/vedtak/regulering/fortsett`,
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

export async function fortsettAvhengigeBehandling(
  accessToken: string,
  behandlingIdRegulering: string,
  antallFamiliebehandlinger: string,
  fortsettTilAktivitet: string,
): Promise<FortsettBatchResponse> {

  const body: any = {
    behandlingId: behandlingIdRegulering,
    fortsettTilAktivitet: fortsettTilAktivitet,
    antallBehandlinger: antallFamiliebehandlinger,
  }

  const response = await fetch(
    `${env.penUrl}/api/vedtak/regulering/fortsett/avhengige`,
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
    return (await response.json()) as FortsettBatchResponse
  } else {
    throw new Error()
  }
}
