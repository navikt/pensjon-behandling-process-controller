import { Form } from '@remix-run/react'

export default function BatchOpprett() {
  const lastYear = new Date().getFullYear() - 1
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
    </div>
  )
}
