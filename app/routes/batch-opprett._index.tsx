import { Form, NavLink, useSubmit } from '@remix-run/react'
import { json } from '@remix-run/node'
import { env } from '~/services/env.server'
import React, { useState, useRef, useEffect } from 'react'
import { Select } from '@navikt/ds-react'

export const loader = async () => {
  return json({
    env: env.env,
  })
}

export default function BatchOpprett_index() {
  const now = new Date()
  const lastYear = now.getFullYear() - 1
  const denneBehandlingsmaneden = now.getFullYear() * 100 + now.getMonth() + 1
  const [isClicked, setIsClicked] = useState(false)
  const submit = useSubmit()
  const handleSubmit = (e:any)=> {submit(e.target.form); setIsClicked(true)}

  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.style.width = `${inputRef.current.value.length + 1}ch`
    }
  }

  useEffect(() => {
    handleInput()
  })

  return (
    <div>
      <h1>Opprett BPEN005 batchkjøring</h1>
      <Form action="bpen005" method="POST">
        <div style={{ display: 'inline-block' }}>
          <label>Behandlingsmåned</label>
          <br />
          <input
            defaultValue={denneBehandlingsmaneden}
            aria-label="Behandlingsmåned"
            name="behandlingsmaned"
            type="number"
            placeholder="Behandlingsmåned"
          />
        </div>
        <br />
        <div style={{ display: 'inline-block' }}>
          <Select
            label="Begrenset utplukk"
            size={'small'}
            name={'begrensetUtplukk'}
            defaultValue={'false'}
          >
            <option value="true">Ja</option>
            <option value="false">Nei</option>
          </Select>
        </div>
        <p>
          <button type="submit" disabled={isClicked} onClick={handleSubmit}>
            Opprett
          </button>
        </p>
      </Form>

      <h1>Opprett BPEN006 batchkjøring</h1>
      <Form action="bpen006" method="POST">
        <p>
          Behandlingsmåned
          <input
            defaultValue={denneBehandlingsmaneden}
            aria-label="Behandlingsmåned"
            name="behandlingsmaned"
            type="number"
            placeholder="Behandlingsmåned"
          />
        </p>
        <p>
          <button type="submit" disabled={isClicked} onClick={handleSubmit}>
            Opprett
          </button>
        </p>
      </Form>

      <h1>Opprett BPEN007 batchkjøring</h1>
      <Form action="bpen007" method="POST">
        <p>
          Behandlingsår
          <input
            defaultValue={lastYear}
            aria-label="År"
            name="behandlingsAr"
            type="number"
            placeholder="År"
          />
        </p>
        <p>
          <button type="submit">Opprett</button>
        </p>
      </Form>
      <h1>Opprett ADHOC Brevbestilling batchkjøring på brevmal for sak</h1>
      <Form action="adhocBrev" method="POST">
        <p>
          Brevmal kode for Sak
          <input
            ref={inputRef}
            defaultValue="PE_AP_ADHOC_2024_GJR_AP_MNTINDV_2"
            aria-label="Brevmal"
            name="brevmal"
            type="text"
            placeholder="Brevmal"
            onInput={handleInput}
            style={{ width: 'auto' }}
          />
        </p>
        <p>
          <button type="submit" disabled={isClicked} onClick={handleSubmit}>
            Opprett
          </button>
        </p>
      </Form>
      <h1>Opprett BPEN068 batchkjøring</h1>
      <Form action="bpen068" method="POST">
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
      </Form>
      <h1>Opprett BPEN091 batchkjøring</h1>
      <Form action="bpen091" method="POST">
        <p>
          Behandlingsår
          <input
            defaultValue={lastYear}
            aria-label="År"
            name="behandlingsAr"
            type="number"
            placeholder="År"
          />
        </p>
        <p>
          <button type="submit">Opprett</button>
        </p>
      </Form>

      <h1>Opprett BPEN096 batchkjøring</h1>
      <Form action="bpen096" method="POST">
        <p>
          <button type="submit">Opprett</button>
        </p>
      </Form>

      <h1>Opprett RTV Brev Sammenligninger</h1>

      <NavLink to={'./rtv-brev-sammenligning'}>
        Opprett RTV Brev Sammenligninger
      </NavLink>
      <h1>Opprett Omsorgsopptjening uttrekk</h1>
      <NavLink to={'./omsorgsopptjening-uttrekk'}>
        Opprett Omsorgsopptjening-uttrekk
      </NavLink>
      <h1>Overfør Klager til Kabal</h1>
      <NavLink to={'./overfortilkabal'}>Start batch behandling</NavLink>
    </div>
  )
}
