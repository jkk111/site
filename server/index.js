const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')
const path = require('path')

const staticPath = path.join(__dirname, '../client')

app.post('/email', bodyParser.json(), async (req, res) => {
  const { email, name, subject, message } = req.body
  db.query(
    'INSERT INTO email (email, name, subject, message) VALUES($1, $2, $3, $4)',
    [email, name, subject, message],
  )
  res.send('ok')
})

app.get('/email', async (req, res) => {
  const resp = await db.query('SELECT * FROM email')
  res.send(resp.rows)
})

app.use(express.static(staticPath))

const run = async () => {
  await db.init()
  app.listen(8080)
}

run()
