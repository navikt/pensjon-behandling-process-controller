import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { opprettRtvBrevSammenligning } from '~/services/batch.rtv-brev-sammenligning.server'


export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  const accessToken = await requireAccessToken(request)

  console.log("foo", updates.brukAutoBrev == "on")
  console.log("bar", updates.brukAutoBrev.toString)

  let response = await opprettRtvBrevSammenligning(
    accessToken,
    updates.brevGruppe.toString(),
    updates.brevKode.toString(),
    +updates.maksAntall,
    updates.brukAutoBrev == "on",
)

  return redirect(`/behandling/${response.behandlingId}`)
}
