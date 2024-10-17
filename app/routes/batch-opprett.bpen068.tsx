import type { ActionFunctionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { opprettBpen068 } from '~/services/batch.bpen068.server'


export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const accessToken = await requireAccessToken(request)

  let response = await opprettBpen068(accessToken, updates.satsDato as string, updates.reguleringsDato as string)

  return redirect(`/behandling/${response.behandlingId}`)
}
