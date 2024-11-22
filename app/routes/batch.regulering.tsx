import type { ActionFunctionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { fortsettBehandling, startRegulering } from '~/services/batch.bpen068.server'
import ReguleringBatch from '~/components/regulering/regulering-batch'
import FortsettFamilieReguleringBehandling from '~/components/regulering/regulering-fortsettbehandling'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const accessToken = await requireAccessToken(request)

  const behandlingIfFamilie = updates.behandlingIdFamilie as string

  if(behandlingIfFamilie !== undefined && behandlingIfFamilie !== ''){
    let response = await fortsettBehandling(
      accessToken,
      updates.behandlingIdFamilie as string,
      updates.fortsettTilAktivitet as string,
    )

    return redirect(`/behandling/${response.behandlingId}`)
  } else {
    let response = await startRegulering(
      accessToken,
      updates.satsDato as string,
      updates.reguleringsDato as string,
      updates.sisteAktivitet as string,
      updates.maxFamiliebehandlinger as string
    )

    return redirect(`/behandling/${response.behandlingId}`)
  }

}

export default function OpprettReguleringBatchRoute() {
  return (
    <div>
      <ReguleringBatch />
      <FortsettFamilieReguleringBehandling />
    </div>
  )
}