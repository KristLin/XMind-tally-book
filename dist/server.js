import express from 'express'
import serveStatic from 'serve-static'

const app = express()
const port = process.env.PORT || 5000

app.use(serveStatic(__dirname))
app.listen(port)
