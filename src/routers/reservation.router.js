import { Router } from 'express'
import { fetchTables } from '../services/data.service.js'

const reservationRouter = Router()

// reservations for each one
reservationRouter.get('/company/:companyId', async function(req, res) {
  const { companyId } = req.params

  const requests = await fetchTables('reservations', 'company_id', companyId) 
  res.json(requests)
})

reservationRouter.get('/organization/:organizationId', async function(req, res) {
  const { organizationId } = req.params

  const requests = await fetchTables('reservations', 'company_id', organizationId) 
  res.json(requests)
})

export default reservationRouter;
