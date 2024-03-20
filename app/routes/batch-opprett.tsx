import { Form } from '@remix-run/react'


export default function BatchOpprett() {
  const now = new Date()
  const lastYear = now.getFullYear() - 1
  const denneBehandlingsmaneden = now.getFullYear() * 100 + now.getMonth() + 1

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
      </div>
  )
}
