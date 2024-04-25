import type { LoaderFunctionArgs } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  getAvhengigeBehandlinger,
} from '~/services/behandling.server'

import invariant from 'tiny-invariant'
import { requireAccessToken } from '~/services/auth.server'
import AvhengigeBehandlingerElement from '~/components/behandling/avhengige-behandlinger/AvhengigeBehandlingerElement'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.behandlingId, 'Missing behandlingId param')

  let { searchParams } = new URL(request.url);

  const accessToken = await requireAccessToken(request)

  let minLevel = searchParams.get('minLevel')
  let maxLevel = searchParams.get('maxLevel')
  let page = searchParams.get('page')
  let size = searchParams.get('size')

  const avhengigeBehandlinger = await getAvhengigeBehandlinger(
    accessToken,
    +params.behandlingId,
    searchParams.get('behandlingType'),
    searchParams.get('status'),
    minLevel ? +minLevel : 2,
    maxLevel ? +maxLevel : 1000,
    page ? +page : 0,
    size ? +size : 10,
  )

  return defer(
    {
      avhengigeBehandlinger,
    })
}

export default function AvhengigeBehandlinger() {
  const { avhengigeBehandlinger } = useLoaderData<typeof loader>()

  return (
    <AvhengigeBehandlingerElement avhengigeBehandlinger={avhengigeBehandlinger}/>
  )
}
