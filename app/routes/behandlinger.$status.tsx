import type { LoaderFunctionArgs } from '@remix-run/node'
import { ActionFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getBehandlinger } from '~/services/behandling.server'

import { requireAccessToken } from '~/services/auth.server'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'
import invariant from 'tiny-invariant'

export const loader = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.status, 'Missing status param')

  const accessToken = await requireAccessToken(request)
  const behandlinger = await getBehandlinger(accessToken, params.status)
  if (!behandlinger) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ behandlinger })
}

export default function BehandlingerStatus() {
  const { behandlinger } = useLoaderData<typeof loader>()

  return (
    <div id="behandlinger">
      <BehandlingerTable behandlingerResponse={behandlinger} />
    </div>
  )
}
