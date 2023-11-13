import {
  createCookie,
  createCookieSessionStorage,
  createMemorySessionStorage,
  redirect,
} from '@remix-run/node'

// export the whole sessionStorage object
const sessionCookie = createCookie(
  '_session', // use any name you want here
  {
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secure: process.env.NODE_ENV === 'production', // enable this in prod only
  },
)

export let sessionStorage = createCookieSessionStorage({
  cookie: sessionCookie,
})

// you can also export the methods individually for your own usage
export let { getSession, commitSession, destroySession } = sessionStorage
