import { ActionFunctionArgs, defer } from '@remix-run/node'
import { Alert, Search, VStack } from '@navikt/ds-react'
import { requireAccessToken } from '~/services/auth.server'
import { search } from '~/services/behandling.server'
import { useLoaderData } from '@remix-run/react'
import BehandlingerTable from '~/components/behandlinger-table/BehandlingerTable'

export const loader = async ({ request }: ActionFunctionArgs) => {
  let { searchParams } = new URL(request.url);

  let behandlinger = null

  let query = searchParams.get('query')
  if (query) {
    const accessToken = await requireAccessToken(request)

    let page = searchParams.get('page')
    let size = searchParams.get('size')

    behandlinger = await search(
      accessToken,
      query,
      searchParams.get('behandlingType'),
      searchParams.get('status'),
      page ? +page : 0,
      size ? +size : 10,
      searchParams.get('sort'),
    )

  } else {
    behandlinger = null
  }

  return defer(
    {
      behandlinger,
    })
}

export default function Sok() {
  const { behandlinger } = useLoaderData<typeof loader>()

  return (
    <VStack gap="4">
      <Alert variant="info">
        Søkefunksjonaliteten er under utvikling. Foreløpig så er det kun støtte for å søke med journalpostId
      </Alert>

      <form method='get'>
        <Search label='sok' variant='primary' name='query'></Search>
      </form>

      {
        behandlinger ?
          <BehandlingerTable visStatusSoek={true} behandlingerResponse={behandlinger} />
          : <></>
      }
    </VStack>
  )
}
