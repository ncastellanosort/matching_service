import { Router } from 'express'
import { fetchArrayOfRecords, modifyStatus, saveRequest } from '../services/data.service.js'

const requestRouter = Router()

// get a catalog_service para traer todo los excedentes publicados por las empresas

// la organization crea una solicitud
requestRouter.post('/', async function(req, res) {
  const postResponse = await saveRequest(req.body)
  res.json(postResponse)
})

// empresa revisa las solicitudes que tiene
requestRouter.get('/company/:companyId', async function(req, res) {
  const { companyId } = req.params

  const requests = await fetchArrayOfRecords('requests', 'company_id', companyId) 
  res.json(requests)
})

// actualizan el estado de la solicitud de la empresa
requestRouter.patch('/:requestId/accept', async function(req, res) {
  const { requestId } = req.params
  const requests = await modifyStatus('requests', requestId, 'accepted', true)

  res.json(requests)
})

requestRouter.patch('/:requestId/reject', async function(req, res) {
  const { requestId } = req.params
  const requests = await modifyStatus('requests', requestId, 'rejected', false)

  res.json(requests)
})

export default requestRouter;
