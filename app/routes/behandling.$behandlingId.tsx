import type { LoaderFunctionArgs } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  getAvhengigeBehandlinger,
  getBehandling,
  getDetaljertFremdrift,
} from '~/services/behandling.server'

import invariant from 'tiny-invariant'
import { requireAccessToken } from '~/services/auth.server'
import BehandlingCard from '~/components/behandling/BehandlingCard'
import type { BehandlingerPage, DetaljertFremdriftDTO } from '~/types'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.behandlingId, 'Missing behandlingId param')

  const accessToken = await requireAccessToken(request)
  const behandling = await getBehandling(accessToken, params.behandlingId)
  if (!behandling) {
    throw new Response('Not Found', { status: 404 })
  }

  let avhengigeBehandlinger: Promise<BehandlingerPage | null> | null = null
  let detaljertFremdrift: Promise<DetaljertFremdriftDTO | null> | null = null
  if (behandling._links && behandling._links['avhengigeBehandlinger']) {
    detaljertFremdrift = getDetaljertFremdrift(
      accessToken,
      behandling.behandlingId,
    )
  }

  return defer(
    {
      behandling,
      avhengigeBehandlinger: avhengigeBehandlinger,
      detaljertFremdrift: detaljertFremdrift,
    })
}

export default function Behandling() {
  const { behandling, detaljertFremdrift } = useLoaderData<typeof loader>()

  return (
    <BehandlingCard
      behandling={behandling}
      detaljertFremdrift={detaljertFremdrift}
    />
  )
}
