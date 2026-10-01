import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
app.get('/api/health', (_, res) => res.json({ ok: true }))
if (process.env.NODE_ENV === 'production') {
  const dist = path.join(__dirname, '../dist')
  app.use(express.static(dist, { maxAge: '7d', index: false }))
  app.get('*', (_, res) => res.sendFile(path.join(dist, 'index.html')))
}
app.listen(process.env.PORT || 3001, () => console.log('Arendnik server on :' + (process.env.PORT || 3001)))
