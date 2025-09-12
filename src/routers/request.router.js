import { Router } from 'express'

const requestRouter = Router()

// crear la solicitud
requestRouter.post('/', function(req, res) {
  res.json(req.body)
})

// listar las solicitudes que tiene la empresa
requestRouter.get('/company/:companyId', function(req, res) {
  const { companyId } = req.params
  res.json({ "company_id": companyId })
})

// listar las solicitudes hechas por la organizacion
requestRouter.get('/organization/:organizationId', function(req, res) {
  const { organizationId } = req.params
  res.json({ "organization_id": organizationId })
})

// aceptar la solicitud y crear una reserva automaticamente
// disparar llamada al catalog service
requestRouter.patch('/:requestId/accept', function(req, res) {
  const { requestId } = req.params
  res.json({ "requestId": requestId, "state": "accepted" }) // colocar la reserva entera
})

// rechazar la solicitud
requestRouter.patch('/:requestId/deny', function(req, res) {
  const { requestId } = req.params
  res.json({ "requestId": requestId, "state": "denied" })
})

export default requestRouter;
