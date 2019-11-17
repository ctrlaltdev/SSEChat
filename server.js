const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'pug')
app.use(express.static('public'))

const rooms = {}

const sendMsg = (id, msg) => {
  for (const res of rooms[id]) {
    res.write(`data: ${msg}\n\n`)
  }
}

app.get('/chat/:id', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })
  res.write('\n')

  let resIndex

  if (rooms[req.params.id]) {
    rooms[req.params.id].push(res)
    resIndex = rooms[req.params.id].length - 1
  } else {
    rooms[req.params.id] = [res]
    resIndex = 0
  }

  req.on('close', () => {
    rooms[req.params.id].splice(resIndex, 1)
  })
})

app.post('/chat/:id', (req, res) => {
  sendMsg(req.params.id, JSON.stringify(req.body))
  res.sendStatus(204)
})

app.post('/:id', (req, res) => {
  res.render('chat', { username: req.body.username, roomid: req.params.id })
})

app.get('/:id', (req, res) => {
  res.render('index', { username: null, roomid: req.params.id })
})

app.post('/', (req, res) => {
  const ID = req.body.roomid || Buffer.from(crypto.randomBytes(32), 'binary').toString('hex').toUpperCase()
  res.redirect(307, `/${ID}`)
})

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT || 3000)
