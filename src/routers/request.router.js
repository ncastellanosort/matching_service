import { Router } from 'express'
import { fetchTables } from '../services/data.service.js'

const requestRouter = Router()

// create the request
requestRouter.post('/', function(req, res) {
  res.json(req.body)
})

// requests made by a company
requestRouter.get('/company/:companyId', async function(req, res) {
  const { companyId } = req.params

  const requests = await fetchTables('requests', 'company_id', companyId) 
  res.json(requests)
})

// requests made by an organization
requestRouter.get('/organization/:organizationId', async function(req, res) {
  const { organizationId } = req.params

  const requests = await fetchTables('requests', 'organization_id', organizationId) 
  res.json(requests)
})

// accepts the request and creates a new request automatically
// call catalog service
requestRouter.patch('/:requestId/accept', function(req, res) {
  const { requestId } = req.params
  res.json({ "requestId": requestId, "state": "accepted" }) // colocar la reserva entera
})

// reject request
requestRouter.patch('/:requestId/deny', function(req, res) {
  const { requestId } = req.params
  res.json({ "requestId": requestId, "state": "denied" })
})

export default requestRouter;
