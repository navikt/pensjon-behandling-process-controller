import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { requireAccessToken } from '~/services/auth.server'
import { getSokeresultater } from '~/services/behandling.server'
import { Sokeresultater } from '~/components/sok/Sokeresultater'
import { Search } from "@navikt/ds-react";
import { useSubmit, useActionData } from '@remix-run/react'

export const action = async ({request}: ActionFunctionArgs) => {
  const url = new URL(request.url)
  const size = url.searchParams.get('size')
  const page = url.searchParams.get('page')

  const formData = await request.formData()
  const sakId = String(formData.get('SakId'))

  const accessToken = await requireAccessToken(request)
  const sokResponse = await getSokeresultater(
    accessToken, 
    sakId,
    page ? +page : 0,
    size ? +size : 100)
  return json({ sokResponse })
}

export default function Sok() {
  
  const { sokResponse } = useActionData<typeof action>() ?? {}
  const submit = useSubmit()
  const handleSubmit = (e: { target: { form: string }})=> submit(e.target.form)
  
    return (<div>   
       <form method = "post">
      <Search label="SakId" variant="primary" name = "SakId" placeholder='Skriv inn sak id' ></Search>
      </form>
        {sokResponse && <Sokeresultater behandlingerResponse={sokResponse!} ></Sokeresultater>}
        </div>
    )
}