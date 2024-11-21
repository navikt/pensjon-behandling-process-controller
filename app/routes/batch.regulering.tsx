import type { ActionFunctionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { startRegulering } from '~/services/batch.bpen068.server'
import ReguleringBatch from '~/components/regulering/regulering-batch'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const accessToken = await requireAccessToken(request)

  let response = await startRegulering(
    accessToken,
    updates.satsDato as string,
    updates.reguleringsDato as string,
    updates.sisteAktivitet as string,
    updates.maxFamiliebehandlinger as string
  )

  return redirect(`/behandling/${response.behandlingId}`)
}

export default function OpprettReguleringBatchRoute() {
  return (
    <ReguleringBatch />
  )
}