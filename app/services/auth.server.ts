import { Authenticator } from 'remix-auth'
import type { OAuth2Profile } from 'remix-auth-oauth2'
import { OAuth2Strategy } from 'remix-auth-oauth2'
import { getSession, sessionStorage } from '~/services/session.server'
import invariant from 'tiny-invariant'
import type { AppLoadContext } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import * as process from 'process'

type User = {
  accessToken: string
  //    refreshToken?: string
  //    extraParams: Record<string, never>
  //    profile: OAuth2Profile
  //    context: AppLoadContext | undefined
  //    request: Request
}

function getUser(
  accessToken: string,
  refreshToken: string | undefined,
  extraParams: Record<string, never>,
  profile: OAuth2Profile,
  context: AppLoadContext | undefined,
  request: Request,
) {
  return {
    accessToken,
    //        refreshToken,
    //        extraParams,
    //        profile,
    //        context,
    //        request
  }
}

export let authenticator = new Authenticator<User>(sessionStorage)

invariant(process.env.AZURE_APP_CLIENT_ID, 'Missing AZURE_APP_CLIENT_ID')
invariant(
  process.env.AZURE_APP_CLIENT_SECRET,
  'Missing AZURE_APP_CLIENT_SECRET',
)
invariant(process.env.AZURE_CALLBACK_URL, 'Missing AZURE_CALLBACK_URL')
invariant(process.env.AZURE_OPENID_AUTHORITY, 'Missing AZURE_OPENID_AUTHORITY')
invariant(
  process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
  'Missing AZURE_OPENID_CONFIG_TOKEN_ENDPOINT',
)
invariant(
  process.env.AZURE_OPENID_CONFIG_ISSUER,
  'Missing AZURE_OPENID_CONFIG_ISSUER',
)

authenticator.use(
  new OAuth2Strategy(
    {
      authorizationURL: process.env.AZURE_OPENID_AUTHORITY,
      tokenURL: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
      clientID: process.env.AZURE_APP_CLIENT_ID,
      clientSecret: process.env.AZURE_APP_CLIENT_SECRET,
      callbackURL: process.env.AZURE_CALLBACK_URL,
      //scope: `openid offline_access ${process.env.AZURE_APP_CLIENT_ID}/.default`,
      scope: `openid offline_access api://dev-fss.pensjon-q2.pensjon-pen-q2/.default`,
      useBasicAuthenticationHeader: false, // defaults to false,
    },
    async ({
      accessToken,
      refreshToken,
      extraParams,
      profile,
      context,
      request,
    }) => {
      // here you can use the params above to get the user and return it
      // what you do inside this and how you find the user is up to you
      return await getUser(
        accessToken,
        refreshToken,
        extraParams,
        profile,
        context,
        request,
      )
    },
  ),
  // this is optional, but if you setup more than one OAuth2 instance you will
  // need to set a custom name to each one
  'azuread',
)

export async function requireUserSession(request: Request) {
  // get the session
  console.log('request', request)
  console.log('headers', request.headers.keys())
  const cookie = request.headers.get('cookie')
  console.log('cookie', cookie)
  const session = await getSession(cookie)

  console.log('require user session', session)
  // validate the session, `userId` is just an example, use whatever value you
  // put in the session when the user authenticated
  let user = session.get('user')
  console.log(user)
  if (!session.has('user')) {
    // if there is no user session, redirect to login
    throw redirect('/login')
  }

  return user as User
}

export async function requireAccessToken(request: Request) {
  const session = await getSession(request.headers.get('cookie'))

  if (!session.has('user')) {
    // if there is no user session, redirect to login
    throw redirect('/login')
  }
  return (session.get('user') as User).accessToken
}
