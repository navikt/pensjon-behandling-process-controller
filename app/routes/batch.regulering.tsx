import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import {
  fortsettAvhengigeBehandling,
  fortsettBehandling,
  startRegulering,
} from '~/services/batch.bpen068.server'
import ReguleringBatch from '~/components/regulering/regulering-batch'
import FortsettFamilieReguleringBehandling from '~/components/regulering/regulering-fortsettbehandling'
import FortsettAvhengigeReguleringBehandlinger from '~/components/regulering/regulering-fortsett-avhengige'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const accessToken = await requireAccessToken(request)

  let response

  if (updates.formType === 'startRegulering') {
    response = await startRegulering(
      accessToken,
      updates.satsDato as string,
      updates.reguleringsDato as string,
      updates.sisteAktivitet as string,
      updates.maxFamiliebehandlinger as string,
    )
  } else if (updates.formType === 'fortsettFamilie') {
    response = await fortsettBehandling(
      accessToken,
      updates.behandlingIdFamilie as string,
      updates.fortsettTilAktivitet as string,
    )
  } else if (updates.formType === 'fortsettAvhengige') {
    response = await fortsettAvhengigeBehandling(
      accessToken,
      updates.behandlingIdRegulering as string,
      updates.antallFamiliebehandlinger as string,
      updates.fortsettTilAktivitet as string,
    )
  }

  if (response && response.behandlingId) {
    return redirect(`/behandling/${response.behandlingId}`)
  }

  return redirect('/error');
}

export default function OpprettReguleringBatchRoute() {
  return (
    <div>
      <ReguleringBatch />
      <FortsettFamilieReguleringBehandling />
      <FortsettAvhengigeReguleringBehandlinger />
    </div>
  )
}
