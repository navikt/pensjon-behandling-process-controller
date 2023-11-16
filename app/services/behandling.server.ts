import type { BehandlingDto, BehandlingerResponse } from '~/types'
import { env } from '~/services/env.server'

export async function getBehandlinger(
  accessToken: string,
): Promise<BehandlingerResponse | null> {
  const response = await fetch(`${env.penUrl}/springapi/behandling/feilende`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Request-ID': crypto.randomUUID(),
    },
  })

  if (response.ok) {
    return (await response.json()) as BehandlingerResponse
  } else {
    throw new Error()
  }
}

export async function getBehandling(
  accessToken: string,
  behandlingId: string,
): Promise<BehandlingDto | null> {
  const response = await fetch(
    `${env.penUrl}/springapi/behandling/${behandlingId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Request-ID': crypto.randomUUID(),
      },
    },
  )

  if (response.ok) {
    return (await response.json()) as BehandlingDto
  } else {
    throw new Error()
  }
}

export async function fortsettBehandling(
  accessToken: string,
  behandlingId: string,
): Promise<void> {
  const response = await fetch(
    `${env.penUrl}/springapi/behandling/${behandlingId}/fortsett`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Request-ID': crypto.randomUUID(),
      },
    },
  )

  if (!response.ok) {
    throw new Error()
  }
}

export async function taTilDebug(
  accessToken: string,
  behandlingId: string,
): Promise<void> {
  const response = await fetch(
    `${env.penUrl}/springapi/behandling/${behandlingId}/debug`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Request-ID': crypto.randomUUID(),
      },
    },
  )

  if (!response.ok) {
    throw new Error()
  }
}

export async function fjernFraDebug(
  accessToken: string,
  behandlingId: string,
): Promise<void> {
  const response = await fetch(
    `${env.penUrl}/springapi/behandling/${behandlingId}/debug`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Request-ID': crypto.randomUUID(),
      },
    },
  )

  if (!response.ok) {
    throw new Error()
  }
}
