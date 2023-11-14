import type { BehandlingDto, BehandlingerResponse } from '~/types'

export async function getBehandlinger(
  accessToken: string,
): Promise<BehandlingerResponse | null> {
  const response = await fetch(
    `${process.env.PEN_URL}/springapi/psak2/behandling/feilende`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Request-ID': crypto.randomUUID(),
      },
    },
  )

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
    `${process.env.PEN_URL}/springapi/psak2/behandling/${behandlingId}`,
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
    `${process.env.PEN_URL}/springapi/psak2/behandling/${behandlingId}/fortsett`,
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
