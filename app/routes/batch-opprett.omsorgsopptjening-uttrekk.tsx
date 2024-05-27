import OpprettOmsorgsopptjeningUttrekk from '~/components/omsorgsopptjening-uttrekk/omsorgsopptjening-uttrekk'
import {
  ActionFunctionArgs, redirect,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData} from '@remix-run/node'


import { requireAccessToken } from '~/services/auth.server'
import {
  opprettOmsorgsopptjeningUttrekk
} from '~/services/batch.opprett-omsorgsopptjening-uttrekk'

export const action = async ({ request }: ActionFunctionArgs) => {
  const accessToken = await requireAccessToken(request)
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  let minfil = formData.get("minfil") as File

  let response = await opprettOmsorgsopptjeningUttrekk(
    accessToken,
    minfil
  )

  return redirect(`/behandling/${response.behandlingId}`)
}
export default function OpprettUttrekk() {
  return (
    <OpprettOmsorgsopptjeningUttrekk />
  )
}