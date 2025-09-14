import { app } from './src/app.js'
import express from 'express'
import requestRouter from './src/routers/request.router.js'
import reservationRouter from './src/routers/reservation.router.js'

const PORT = process.env.PORT || 3000

app.disable('x-powered-by')
app.use(express.json())
app.use('/requests', requestRouter)
app.use('/reservations', reservationRouter)

app.listen(PORT, function() {
  console.log(`listening on ${PORT}`)
})
