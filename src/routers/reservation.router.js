import { Router } from 'express'
import { fetchArrayOfRecords } from '../services/data.service.js'

const reservationRouter = Router()

/**
 * @openapi
 * /reservations/company/{companyId}:
 *   get:
 *     summary: Consultar reservas de una empresa
 *     parameters:
 *       - in: path
 *         name: companyId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Lista de reservas de la empresa
 */
reservationRouter.get('/company/:companyId', async function(req, res) {
  const { companyId } = req.params

  const requests = await fetchArrayOfRecords('reservations', 'company_id', companyId) 
  res.json(requests)
})

/**
 * @openapi
 * /reservations/organization/{organizationId}:
 *   get:
 *     summary: Consultar reservas de una organización
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la organización
 *     responses:
 *       200:
 *         description: Lista de reservas de la organización
 */
reservationRouter.get('/organization/:organizationId', async function(req, res) {
  const { organizationId } = req.params

  const requests = await fetchArrayOfRecords('reservations', 'organization_id', organizationId) 
  res.json(requests)
})

export default reservationRouter;

