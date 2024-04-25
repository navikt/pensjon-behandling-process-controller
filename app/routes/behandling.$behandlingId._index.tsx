import type { LoaderFunctionArgs } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  getBehandling,
} from '~/services/behandling.server'

import invariant from 'tiny-invariant'
import { requireAccessToken } from '~/services/auth.server'
import { BehandlingKjoringerTable } from '~/components/kjoringer-table/BehandlingKjoringerTable'
import React from 'react'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.behandlingId, 'Missing behandlingId param')

  const accessToken = await requireAccessToken(request)
  const behandling = await getBehandling(accessToken, params.behandlingId)
  if (!behandling) {
    throw new Response('Not Found', { status: 404 })
  }

  return defer(
    {
      behandling,
    })
}

export default function BehandlingKjoringer() {
  const { behandling } = useLoaderData<typeof loader>()

  return (
    <BehandlingKjoringerTable behandling={behandling} visAktivitetId={true} />
  )
}
