import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  getBehandlinger,
} from '~/services/behandling.server'

import { requireAccessToken } from '~/services/auth.server'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  let { searchParams } = new URL(request.url);

  const accessToken = await requireAccessToken(request)

  let page = searchParams.get('page')
  let size = searchParams.get('size')

  const behandlinger = await getBehandlinger(
    accessToken,
    searchParams.get('behandlingType'),
    searchParams.get('status'),
    null,
    null,
    page ? +page : 0,
    size ? +size : 100,
    searchParams.get('sort'),
  )
  if (!behandlinger) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ behandlinger })

}

export default function AvhengigeBehandlinger() {
  const { behandlinger } = useLoaderData<typeof loader>()

  return (
    <div id="behandlinger">
      <BehandlingerTable visStatusSoek={true} behandlingerResponse={behandlinger} />
    </div>
  )
}
