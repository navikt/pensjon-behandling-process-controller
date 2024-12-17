import React, { useState } from 'react'
import { Form, useSubmit } from '@remix-run/react'

export default function FortsettAvhengigeReguleringBehandlinger() {

  const [isClicked, setIsClicked] = useState(false);
  const submit = useSubmit();
  const handleSubmit = (e: any) => {
    submit(e.target.form)
    setIsClicked(true)
  }

  return (
    <div>
      <h2>Fortsett flere familiebehandlinger</h2>
      <Form method="POST">
        <input type="hidden" name="formType" value="fortsettAvhengige" />
        <p>
          BehandlingId for Orkestrering behandling
          <input
            defaultValue=""
            aria-label="BehandlingIdRegulering"
            name="behandlingIdRegulering"
            type="text"
            placeholder="BehandlingId for Uttreksbehandling"
          />
        </p>
        <p>
          Antall avhengige behandlinger
          <input
            defaultValue="10"
            aria-label="AntallFamiliebehandlinger"
            name="antallFamiliebehandlinger"
            type="text"
            placeholder="Maks antall familiebehandlinger (-1 for alle)"
          />
        </p>
        <p>
          Fortsett til prosesserings-aktivitet Axxx
          <input
            defaultValue="A202"
            aria-label="FortsettTilAktivitet"
            name="fortsettTilAktivitet"
            type="text"
            placeholder="Fortsett Til Aktivitet"
          />
        </p>
        <p>
          <button type="submit" disabled={isClicked} onClick={handleSubmit}>
            Fortsett
          </button>
        </p>
      </Form>
    </div>
  )
}