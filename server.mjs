import { createRequestHandler } from '@remix-run/express'
import express from 'express'

// notice that the result of `remix build` is "just a module"
import * as build from './build/index.js'

const app = express()
app.use(express.static('public'))

app.get(
    ['/internal/live', '/internal/ready'],
    (_, res) => res.sendStatus(200),
);

// and your app is "just a request handler"
app.all('*', createRequestHandler({ build }))

app.listen(8080, () => {
  console.log('App listening on http://localhost:8080')
})
