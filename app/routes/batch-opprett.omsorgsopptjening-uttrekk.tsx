import OpprettOmsorgsopptjeningUttrekk from '~/components/omsorgsopptjening-uttrekk/omsorgsopptjening-uttrekk'
import type { ActionFunctionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node'


import { requireAccessToken } from '~/services/auth.server'
import { opprettOmsorgsopptjeningUttrekk } from '~/services/batch.opprett-omsorgsopptjening-uttrekk'

export const action = async ({ request }: ActionFunctionArgs) => {
  const accessToken = await requireAccessToken(request)
  const formData = await request.formData()

  let minfil = formData.get("minfil") as File

  minfil.stream().getReader().read()
  .then(async value => {
    let bestilling = {
      innhold: JSON.stringify(new TextDecoder().decode(value.value))
    }
    console.log("Bestilling: " + JSON.stringify(bestilling))
    let response = await opprettOmsorgsopptjeningUttrekk(
      accessToken,
      bestilling
    )
    return redirect(`/behandling/${response.behandlingId}`)
  })
  return redirect(`/dashboard`)
}
export default function OpprettUttrekk() {
  return (
    <OpprettOmsorgsopptjeningUttrekk />
  )
}