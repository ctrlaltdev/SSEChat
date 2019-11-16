const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(bodyParser.json())

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

  if (rooms[req.params.id]) {
    rooms[req.params.id].push(res)
  } else {
    rooms[req.params.id] = [res]
  }
})

app.post('/chat/:id', (req, res) => {
  sendMsg(req.params.id, req.body.msg)
  res.sendStatus(204)
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(3000)
