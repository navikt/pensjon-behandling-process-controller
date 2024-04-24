import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { requireAccessToken } from '~/services/auth.server'
import { fortsettAvhengigeBehandlinger, getBehandling } from '~/services/behandling.server'

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.behandlingId, 'Missing behandlingId param')

  const accessToken = await requireAccessToken(request)

  await fortsettAvhengigeBehandlinger(accessToken, params.behandlingId)

  return getBehandling(accessToken, params.behandlingId)
}
