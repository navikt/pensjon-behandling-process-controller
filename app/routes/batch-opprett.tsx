import { Form, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { env } from '~/services/env.server'

export const loader = async () => {
  return json({
    env: env.env,
  })
}

export default function BatchOpprett() {
  const now = new Date()
  const lastYear = now.getFullYear() - 1
  const denneBehandlingsmaneden = now.getFullYear() * 100 + now.getMonth() + 1
  const { env } = useLoaderData<typeof loader>()

  return (
      <div>
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
              <button type="submit">Opprett</button>
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
          <Form action='bpen096' method='POST'>
              <p>
                  <button type='submit'>Opprett</button>
              </p>
          </Form>

        { env !== 'p' ? (
          <>
          <h1>Opprett RTV Brev Sammenligning</h1>
          <Form action='rtv-brev-sammenligning' method='POST'>
            <p>
              Brevgruppe:
              <input
                aria-label="Brevgruppe"
                name="brevGruppe"
                type="string"
                placeholder="Brevgruppe"
              />
            </p>
            <p>
              Brevkode:
              <input
                aria-label="Brevkode"
                name="brevKode"
                type="string"
                placeholder="Brevkode"
              />
            </p>
            <p>
              Maks antall:
              <input
                aria-label="Maks antall"
                name="maksAntall"
                type="number"
                placeholder="Maks antall"
              />
            </p>
            <p>
              Bruk autobrev:
              <input
                aria-label="Bruk autobrev"
                name="brukAutoBrev"
                type="checkbox"
                placeholder="Bruk autobrev"
              />
            </p>
            <p>
              Start AutobrevId:
              <input
                aria-label="Start AutobrevId"
                name="startAutobrevId"
                type="number"
                placeholder="Start AutobrevId"
              />
            </p>
            <p>
              <button type='submit'>Opprett</button>
            </p>
          </Form>
          </>
        ) : <></> }
      </div>
  )
}
