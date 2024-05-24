import { env } from '~/services/env.server'

export async function sendTilOppdragPaNytt(
  accessToken: string,
  behandlingId: string,
): Promise<void> {
  const response = await fetch(
    `${env.penUrl}/api/vedtak/iverksett/${behandlingId}/sendtiloppdragpanytt`,
    {
      method: 'POST',
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
