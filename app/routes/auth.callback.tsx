import type { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'

export const loader = ({ request }: LoaderFunctionArgs) => {
  console.log('auth callback', request)
  return authenticator.authenticate('azuread', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
  })
}
