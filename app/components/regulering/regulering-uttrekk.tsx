
import React, { useState } from 'react'
import { Form, useSubmit } from '@remix-run/react'

export default function ReguleringUttrekk() {

  const [isClicked, setIsClicked] = useState(false);
  const submit = useSubmit();
  const handleSubmit = (e:any)=> {submit(e.target.form); setIsClicked(true)}

  return <div><h1>Start Regulering Uttrekk</h1><Form method="POST">
    <input type="hidden" name="formType" value="startRegulering" />
    <p>
      Satsdato
      <input
        defaultValue="2025-05-01"
        aria-label="Satsdato"
        name="satsDato"
        type="text"
        placeholder="Satsdato"
      />
    </p>
    <p>
      Reguleringsdato
      <input
        defaultValue="2025-05-01"
        aria-label="Reguleringsdato"
        name="reguleringsDato"
        type="text"
        placeholder="Reguleringsdato"
      />
    </p>
    <p>
      Kjør til og med aktivitet
      <input
        defaultValue="A100"
        aria-label="SisteAktivitet"
        name="sisteAktivitet"
        type="text"
        placeholder="SisteAktivitet"
      />
    </p>
    <p>
      Opprett max antall familiebehandlinger
      <select
        aria-label="MaxFamiliebehandlinger"
        name="maxFamiliebehandlinger"
        defaultValue="0"
      >
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="10">10</option>
        <option value="100">100</option>
        <option value="500">500</option>
        <option value="-1">Alle</option>
      </select>
    </p>
    <p>
      <button type="submit" disabled={isClicked} onClick={handleSubmit}>
        Opprett
      </button>
    </p>
  </Form>
  </div>;
}