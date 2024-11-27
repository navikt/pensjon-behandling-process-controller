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
      <h1>Fortsett Avhengige behandlinger</h1>
      <Form method="POST">
        <input type="hidden" name="formType" value="fortsettAvhengige" />
        <p>
          BehandlingId for Uttreksbehandling
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
          <select
            aria-label="AntallFamiliebehandlinger"
            name="antallFamiliebehandlinger"
            defaultValue="0"
          >
            <option value="1">1</option>
            <option value="10">10</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="500">500</option>
          </select>
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
          <button
            type="submit"
            disabled={isClicked}
            onClick={handleSubmit}
          >
            Fortsett
          </button>
        </p>
      </Form>
    </div>
  )
}