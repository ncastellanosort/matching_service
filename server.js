import { app } from './src/app.js'
import express from 'express'
import requestRouter from './src/routers/request.router.js'
import reservationRouter from './src/routers/reservation.router.js'
import swaggerDocs from './swagger.js'

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/requests', requestRouter)
app.use('/reservations', reservationRouter)

swaggerDocs(app, PORT)

app.listen(PORT)
