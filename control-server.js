const express = require('express')
const { WebSocketServer } = require('ws')
const http = require('http')

const PORT = process.env.PORT || 3000
const PUBLIC_DIR = __dirname

const app = express()
app.use(express.json())
app.use(express.static(PUBLIC_DIR))

const server = http.createServer(app)
const wss = new WebSocketServer({ server, path: '/control' })

const VALID_ACTIONS = new Set(['start', 'pause', 'reset', 'stop', 'fullscreen'])

function broadcastAction(action) {
  const payload = JSON.stringify({ action })
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(payload)
    }
  })
}

wss.on('connection', (socket) => {
  socket.send(JSON.stringify({ action: 'connected' }))
})

app.post('/api/action', (req, res) => {
  const { action } = req.body || {}
  if (!VALID_ACTIONS.has(action)) {
    return res.status(400).json({ error: 'Invalid action' })
  }

  broadcastAction(action)
  res.json({ ok: true })
})

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, actions: Array.from(VALID_ACTIONS) })
})

server.listen(PORT, () => {
  console.log(`Countdown control server running on http://localhost:${PORT}`)
})
