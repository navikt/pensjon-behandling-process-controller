import OpprettOmsorgsopptjeningUttrekk from '~/components/omsorgsopptjening-uttrekk/omsorgsopptjening-uttrekk'
import type { ActionFunctionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { opprettOmsorgsopptjeningUttrekk } from '~/services/batch.opprett-omsorgsopptjening-uttrekk'

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData: FormData = await request.formData()
  const accessToken = await requireAccessToken(request)

let bestilling = {
    fil : formData.get("files") as File
}

  let response = await opprettOmsorgsopptjeningUttrekk(
    accessToken,
    bestilling
  )

  return redirect(`/behandling/${response.behandlingId}`)
}
export default function OpprettUttrekk() {
  return (
    <OpprettOmsorgsopptjeningUttrekk />
  )
}