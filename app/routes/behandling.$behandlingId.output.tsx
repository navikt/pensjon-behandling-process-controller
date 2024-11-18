import type { LoaderFunctionArgs } from '@remix-run/node'
import { defer } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import type { Output } from '~/services/behandling.server'
import { getOutputFromBehandling } from '~/services/behandling.server'

import invariant from 'tiny-invariant'
import { requireAccessToken } from '~/services/auth.server'
import { Accordion, Box, CopyButton, Link } from '@navikt/ds-react'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.behandlingId, 'Missing behandlingId param')

  const accessToken = await requireAccessToken(request)
  const output = await getOutputFromBehandling(accessToken, params.behandlingId)
  if (!output) {
    throw new Response('Not Found', { status: 404 })
  }

  return defer(
    {
      output,
    })
}

export default function BehandlingOutput() {
  const { output } = useLoaderData<typeof loader>()

  const makeTextFile = (output: Output) => {
    if (typeof window == 'undefined') {
      return ''
    }
    const data = filInnhold(output)
    // this part avoids memory leaks
    if (data !== '') window.URL.revokeObjectURL(data)
    const blob = new Blob(['[' + data + ']'], { type: 'application/json' })
    return window.URL.createObjectURL(blob)
  }

  const filInnhold = (output: Output) =>
    output.rader.map((verdi: string) => (
      JSON.stringify(JSON.parse(verdi), null, 4)
    )).join(',')

  return (
    <>
      <div style={{ display: 'flex' }}>
        {output.resultater.map((resultat) => (
          <Link key={resultat.filnavn}
                style={{ padding: 1 + 'em' }}
            // this attribute sets the filename
                download="liste.json"
            // link to the download URL
                href={makeTextFile(resultat)}
          >
            Last ned {resultat.filnavn}
          </Link>
        ))}
      </div>
      <Accordion>
        {output.resultater.map((res: any, index: number) => (
          <Accordion.Item key={`accordion-${index}`}>
            <Accordion.Header>{res.filnavn}</Accordion.Header>
            <Accordion.Content>
              <CopyButton copyText={'[' + filInnhold(res) + ']'} />
              <Box background="surface-info-subtle" id={`outputbox-${index}`}>
                {res.rader.map((verdi: string) => (
                  <>
                    {JSON.stringify(JSON.parse(verdi), null, 4)},
                    <br />
                  </>
                ))}
              </Box>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  )
}
