const express = require('express')
const next = require('next')
const app = next({ dev: false, dir: '../../../app/dist/apps/frontend'})
const handle = app.getRequestHandler()


const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  const server = express()

  server.get('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
// }
