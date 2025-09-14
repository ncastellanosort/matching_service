import { Router } from 'express'
import { fetchArrayOfRecords } from '../services/data.service.js'

const reservationRouter = Router()

// empresa consulta sus reservas
reservationRouter.get('/company/:companyId', async function(req, res) {
  const { companyId } = req.params

  const requests = await fetchArrayOfRecords('reservations', 'company_id', companyId) 
  res.json(requests)
})

// organizacion consulta sus reservas
reservationRouter.get('/organization/:organizationId', async function(req, res) {
  const { organizationId } = req.params

  const requests = await fetchArrayOfRecords('reservations', 'company_id', organizationId) 
  res.json(requests)
})

export default reservationRouter;
