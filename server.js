import { app } from './src/app.js'
import express from 'express'
import requestRouter from './src/routers/request.router.js'
import bookRouter from './src/routers/book.router.js'

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/requests', requestRouter)
app.use('/book', bookRouter)

app.listen(PORT, function() {
  console.log(`listening on ${PORT}`)
})
