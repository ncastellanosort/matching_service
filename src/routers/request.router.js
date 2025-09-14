import { Router } from 'express'
import { fetchTables, modifyStatus } from '../services/data.service.js'

const requestRouter = Router()

// get a catalog_service para traer todo los excedentes publicados por las empresas

// la organization crea una solicitud
requestRouter.post('/', function(req, res) {
  const todayDate = new Date().toISOString()
  const newProps = { "request_status": "pending", "created_at": todayDate }

  const formattedResponse = Object.assign(req.body, newProps)
  res.json(formattedResponse)
})

// empresa revisa las solicitudes que tiene
requestRouter.get('/company/:companyId', async function(req, res) {
  const { companyId } = req.params

  const requests = await fetchTables('requests', 'company_id', companyId) 
  res.json(requests)
})

// actualizan el estado de la solicitud de la empresa
requestRouter.patch('/:requestId/accept', async function(req, res) {
  const { requestId } = req.params
  const requests = await modifyStatus('requests', requestId, 'accepted')

  res.json(requests)
})

requestRouter.patch('/:requestId/reject', async function(req, res) {
  const { requestId } = req.params
  const requests = await modifyStatus('requests', requestId, 'rejected')

  res.json(requests)
})

export default requestRouter;
