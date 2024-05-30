import type { LoaderFunctionArgs } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  getBehandling, getOutputFromBehandling,
} from '~/services/behandling.server'

import invariant from 'tiny-invariant'
import { requireAccessToken } from '~/services/auth.server'
import { Box } from '@navikt/ds-react'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.behandlingId, 'Missing behandlingId param')

  const accessToken = await requireAccessToken(request)
  const behandling = await getOutputFromBehandling(accessToken, params.behandlingId)
  if (!behandling) {
    throw new Response('Not Found', { status: 404 })
  }

  return defer(
    {
      behandling,
    })
}

export default function BehandlingOutput() {
  const { behandling } = useLoaderData<typeof loader>()

  return (
   <Box background="surface-info-subtle">
     {behandling}

     Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
     ipsum!
   </Box>
  )
}
