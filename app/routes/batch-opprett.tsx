import { Form, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'
import { env } from '~/services/env.server'

export const loader = async () => {
  return json({
    env: env.env,
  })
}

export default function BatchOpprett() {
  const lastYear = new Date().getFullYear() - 1

  const { env } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Opprett BPEN007 batckjøring</h1>
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

      <h1>Opprett BPEN096 batckjøring</h1>
      <Form action='bpen096' method='POST'>
      <p>
        <button type='submit'>Opprett</button>
      </p>
      </Form>
    </div>
  )
}
