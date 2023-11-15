import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const loader = () => redirect('/login')

export const action = async ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate('azuread', request)
}

export default function Login() {
  return (
    <form action="/auth/microsoft" method="post">
      <button>Login with Microsoft</button>
    </form>
  )
}
