import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import {
  fortsettAvhengigeBehandling,
  fortsettBehandling,
  startRegulering,
} from '~/services/batch.bpen068.server'
import ReguleringBatch from '~/components/regulering/regulering-batch'
import FortsettFamilieReguleringBehandling from '~/components/regulering/regulering-fortsettbehandling'
import FortsettAvhengigeReguleringBehandlinger from '~/components/regulering/regulering-fortsett-avhengige'
import { useLoaderData } from '@remix-run/react'
import { getBehandlinger } from '~/services/behandling.server'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'
import { BehandlingerPage } from '~/types'

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
    return redirect(`/behandling/${response.behandlingId}`)

  } else if (updates.formType === 'fortsettFamilie') {
    response = await fortsettBehandling(
      accessToken,
      updates.behandlingIdFamilie as string,
      updates.fortsettTilAktivitet as string,
    )
    return redirect(`/behandling/${response.behandlingId}`)

  } else if (updates.formType === 'fortsettAvhengige') {
    await fortsettAvhengigeBehandling(
      accessToken,
      updates.behandlingIdRegulering as string,
      updates.antallFamiliebehandlinger as string,
      updates.fortsettTilAktivitet as string,
    )
    return redirect(`/behandling/${updates.behandlingIdRegulering}`)

  }

  return redirect('/error');
}

export const loader = async ({ request }: ActionFunctionArgs) => {
  let { searchParams } = new URL(request.url);
  const size = searchParams.get('size')
  const page = searchParams.get('page')

  const accessToken = await requireAccessToken(request)
  const behandlinger = await getBehandlinger(
    accessToken,
    "ReguleringUttrekk",
    null,
    null,
    true,
    page ? +page : 0,
    size ? +size : 100,
    null
  )
  if (!behandlinger) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ behandlinger })
}

export default function OpprettReguleringBatchRoute() {
  const { behandlinger } = useLoaderData<typeof loader>()

  return (
    <div>
      <div>
        <ReguleringBatch />
        <FortsettFamilieReguleringBehandling />
        <FortsettAvhengigeReguleringBehandlinger />
      </div>
      <div id="behandlinger">
        <BehandlingerTable visStatusSoek={true} behandlingerResponse={behandlinger as BehandlingerPage} />
      </div>
    </div>
)
}
