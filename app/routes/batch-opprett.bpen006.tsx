import type { ActionFunctionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { opprettBpen006 } from '~/services/batch.bpen006.server'


export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const accessToken = await requireAccessToken(request)

  let response = await opprettBpen006(accessToken, +updates.behandlingsmaned)

  return redirect(`/behandling/${response.behandlingId}`)
}
