import { Router } from 'express'
import { fetchArrayOfRecords, modifyStatus, saveRequest } from '../services/data.service.js'

const requestRouter = Router()

/**
 * @openapi
 * /requests:
 *   post:
 *     summary: Crear una solicitud de una organización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               surplus_id:
 *                 type: integer
 *                 example: 5
 *               company_id:
 *                 type: integer
 *                 example: 2
 *               organization_id:
 *                 type: integer
 *                 example: 7
 *               message:
 *                 type: string
 *                 example: "Nos interesa este excedente"
 *     responses:
 *       200:
 *         description: Solicitud creada exitosamente
 */
requestRouter.post('/', async function(req, res) {
  const postResponse = await saveRequest(req.body)
  res.json(postResponse)
})

/**
 * @openapi
 * /requests/company/{companyId}:
 *   get:
 *     summary: Empresa revisa todas las solicitudes que tiene
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Lista de solicitudes de la empresa
 */
requestRouter.get('/company/:companyId', async function(req, res) {
  const { companyId } = req.params

  const requests = await fetchArrayOfRecords('requests', 'company_id', companyId) 
  res.json(requests)
})

/**
 * @openapi
 * /requests/{requestId}/accept:
 *   patch:
 *     summary: Aceptar una solicitud por parte de la empresa
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud a aceptar
 *     responses:
 *       200:
 *         description: Solicitud actualizada como aceptada
 */
requestRouter.patch('/:requestId/accept', async function(req, res) {
  const { requestId } = req.params
  const requests = await modifyStatus('requests', requestId, 'accepted', true)

  res.json(requests)
})

/**
 * @openapi
 * /requests/{requestId}/reject:
 *   patch:
 *     summary: Rechazar una solicitud por parte de la empresa
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la solicitud a rechazar
 *     responses:
 *       200:
 *         description: Solicitud actualizada como rechazada
 */
requestRouter.patch('/:requestId/reject', async function(req, res) {
  const { requestId } = req.params
  const requests = await modifyStatus('requests', requestId, 'rejected', false)

  res.json(requests)
})

export default requestRouter;

