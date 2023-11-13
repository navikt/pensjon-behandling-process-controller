import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import { sessionStorage } from '~/services/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate('azuread', request)
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/',
  })

  const session = await sessionStorage.getSession(request.headers.get('Cookie'))

  const error = session.get('sessionErrorKey')
  return json<any>({ error })
}

export default function Login() {
  return (
    <form action="/auth/microsoft" method="post">
      <button>Login with Microsoft</button>
    </form>
  )
}
