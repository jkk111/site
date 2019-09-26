const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./db')

app.post('/email', bodyParser.json(), async (req, res) => {
  const { email, name, subject, message } = req.body
  db.query(
    'INSERT INTO email (email, name, subject, message) VALUES($1, $2, $3, $4)',
    [email, name, subject, message],
  )
  res.send('ok')
})

const run = async () => {
  await db.init()
  app.listen(8080)
}

run()
