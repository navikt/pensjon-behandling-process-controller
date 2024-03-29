import { ActionFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { getBehandlinger } from '~/services/behandling.server'

import { requireAccessToken } from '~/services/auth.server'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const size = url.searchParams.get('size')
  const page = url.searchParams.get('page')

  const accessToken = await requireAccessToken(request)
  const behandlinger = await getBehandlinger(
    accessToken,
    null,
    null,
    true,
    page ? +page : 0,
    size ? +size : 100,
  )
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
