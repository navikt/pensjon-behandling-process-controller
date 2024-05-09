import { Form, useLoaderData } from '@remix-run/react'
import type { loader } from '~/routes/batch-opprett.rtv-brev-sammenligning'
import { Select } from '@navikt/ds-react'
import { useState } from 'react'
import OpprettAutobrevRtvBrevSammenligning
  from '~/components/rtv-brev-sammenligning/OpprettAutobrevRtvBrevSammenligning'
import OpprettVedtakRtvBrevSammenligning from '~/components/rtv-brev-sammenligning/OpprettVedtakRtvBrevSammenligning'

export default function OpprettRtvBrevSammenligning() {
  const { env } = useLoaderData<typeof loader>()
  const [bestillingstype, setBestillingstype] = useState<string>();

  const bestillingstypeValg = () => {
    return (
      <Select
        onChange={(value) => {
          setBestillingstype(value.target.value)
        }}

        name="bestilling"
        label="Type bestilling"
        size="small"
      >
        <option value="">Velg type</option>
        <option value="autobrev">Autobrev</option>
        <option value="vedtak">Vedtak</option>
      </Select>
    );
  }

  const sammenligning = () => {
    if (bestillingstype === "autobrev") {
      return <OpprettAutobrevRtvBrevSammenligning></OpprettAutobrevRtvBrevSammenligning>
    } else if (bestillingstype === "vedtak") {
      return <OpprettVedtakRtvBrevSammenligning></OpprettVedtakRtvBrevSammenligning>
    } else {
      return <></>
    }
  }

  return (
    <div>
      {env !== 'p' ? (
        <>
          <h1>Opprett RTV Brev Sammenligning</h1>
          <Form method='POST'>
            {bestillingstypeValg()}
            {sammenligning()}
            <p>
              <button type='submit'>Opprett</button>
            </p>
          </Form>
        </>
      ) : <></>}
    </div>
  )
}
