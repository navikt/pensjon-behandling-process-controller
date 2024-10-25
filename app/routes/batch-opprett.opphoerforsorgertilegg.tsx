import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { opphoerforsorgertilegg } from '~/services/batch.opphoerforsorgertilegg.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  const accessToken = await requireAccessToken(request)

  let response = await opphoerforsorgertilegg(accessToken)

  return redirect(`/behandling/${response.behandlingId}`)
}

