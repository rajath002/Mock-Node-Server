const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 5000

app.use((req, res, next) => {
  console.log('Request received')
  console.log(`${req.method} ${req.ip} ${req.path} ${req.body}`)
  res.on('finish', () => {
    console.log(`${req.method} ${req.ip} ${req.path} ${res.statusCode}`)
  })
  next()
})

//
app.get('/', (req, res) => {
  fs.readFile('./temp.txt', { encoding: 'utf-8' }, (err, text) => {
    res.send(text)
  })
})

app.post('/', (req, res) => {
  // Replaces the temp.txt file with the text in the body of the request
  fs.writeFile('./temp.txt', req.body.text, { encoding: 'utf-8' }, (err) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send('OK')
    }
  })
})

app.use((req, res) => {
  res.status(404).send('Not found')
})

app.listen(PORT, () => {
  console.log('listening on PORT ', PORT)
})
