const express = require('express')
const fs = require('fs')

const app = express()

const PORT = 5000

app.use((req, res, next) => {
  console.log('Request received')
  console.log(`${req.method} ${req.ip} ${req.path}`)
  res.on('finish', () => {
    console.log(`${req.method} ${req.ip} ${req.path} ${res.statusCode}`)
  })
  next()
})

app.get('/', (req, res) => {
  fs.readFile('./temp.txt', { encoding: 'utf-8' }, (err, text) => {
    res.send(text)
  })
})

app.use((req, res) => {
  res.status(404).send('Not found')
})

app.listen(PORT, () => {
  console.log('listening on PORT ', PORT)
})
