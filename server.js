import { app } from './src/app.js'
import express from 'express'
import requestRouter from './src/routers/request.router.js'
import reservationRouter from './src/routers/reservation.router.js'
import swaggerDocs from './swagger.js'

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/requests', requestRouter)
app.use('/reservations', reservationRouter)

app.use((err, req, res, next) => {
  console.error('error:', err.message)

  const status = err.status || 500

  res.status(status).json({
    success: false,
    message: err.message || 'internal server error',
  })
})

swaggerDocs(app, PORT)

app.listen(PORT)
