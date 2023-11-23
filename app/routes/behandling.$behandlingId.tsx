import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getBehandling, getBehandlinger } from '~/services/behandling.server'

import invariant from 'tiny-invariant'
import { requireAccessToken } from '~/services/auth.server'
import BehandlingCard from '~/components/behandling/BehandlingCard'
import { BehandlingerPage } from '~/types'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.behandlingId, 'Missing behandlingId param')

  const accessToken = await requireAccessToken(request)
  const behandling = await getBehandling(accessToken, params.behandlingId)
  if (!behandling) {
    throw new Response('Not Found', { status: 404 })
  }

  let avhengigeBehandlinger: BehandlingerPage | null
  if (behandling._links && behandling._links['avhengigeBehandlinger']) {
    avhengigeBehandlinger = await getBehandlinger(
      accessToken,
      null,
      behandling.behandlingId,
      null,
      0,
      100,
    )
  } else {
    avhengigeBehandlinger = null
  }

  return json({ behandling, avhengigeBehandlinger })
}

export default function Behandling() {
  const { behandling, avhengigeBehandlinger } = useLoaderData<typeof loader>()

  return (
    <BehandlingCard
      behandling={behandling}
      avhengigeBehandlinger={avhengigeBehandlinger}
    />
  )
}
