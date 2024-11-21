
import React, { useState } from 'react'
import { Form, useSubmit } from '@remix-run/react'

export default function ReguleringBatch() {

  const [isClicked, setIsClicked] = useState(false);
  const submit = useSubmit();
  const handleSubmit = (e:any)=> {submit(e.target.form); setIsClicked(true)}

  return <Form action="regulering" method="POST">
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
      <button type="submit" disabled={isClicked} onClick={handleSubmit}>
        Opprett
      </button>
    </p>
  </Form>;
}

