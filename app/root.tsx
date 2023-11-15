import type { LinksFunction } from '@remix-run/node'

import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from '@remix-run/react'
import navInternalStyles from '@navikt/ds-css-internal/dist/index.css'
import navStyles from '@navikt/ds-css/dist/index.css'

import appStylesHref from './app.css'

import { cssBundleHref } from '@remix-run/css-bundle'
import { HStack, InternalHeader, Spacer, VStack } from '@navikt/ds-react'

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref
      ? [
          { rel: 'stylesheet', href: cssBundleHref },
          { rel: 'stylesheet', href: navStyles },
          { rel: 'stylesheet', href: navInternalStyles },
          { rel: 'stylesheet', href: appStylesHref },
        ]
      : []),
  ]
}

export default function App() {
  const navigation = useNavigation()

  return (
    <html lang="en">
      <head>
        <title>Behandling Process Controller</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <VStack gap="0" style={{ width: '100%' }}>
          <InternalHeader>
            <InternalHeader.Title as="h1">
              Behandling Process Controller
            </InternalHeader.Title>
            <Spacer />
            <InternalHeader.User name="Ola Utvikler" />
          </InternalHeader>

          <HStack gap="0">
            <div id="sidebar">
              <nav>
                <ul>
                  <li>
                    <NavLink to={`/dashboard`}>Dashboard</NavLink>
                    <NavLink to={`/behandlinger/?feilende`}>
                      Feilende behandlinger
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div
              className={navigation.state === 'loading' ? 'loading' : ''}
              id="detail"
            >
              <Outlet />
            </div>
          </HStack>
        </VStack>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
