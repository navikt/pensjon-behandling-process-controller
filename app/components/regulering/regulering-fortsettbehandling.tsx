import React, { useState } from 'react'
import { Form, useSubmit } from '@remix-run/react'

export default function FortsettFamilieReguleringBehandling() {

  const [isClicked, setIsClicked] = useState(false);
  const submit = useSubmit();
  const handleSubmit = (e: any) => {
    submit(e.target.form)
    setIsClicked(true)
  }

  return (
    <div>
      <h1>Fortsett Familiebehandling</h1>
      <Form method="POST">
        <input type="hidden" name="formType" value="fortsettFamilie" />
        <p>
          BehandlingId
          <input
            defaultValue=""
            aria-label="BehandlingIdFamilie"
            name="behandlingIdFamilie"
            type="text"
            placeholder="BehandlingId for Familiebehandling"
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