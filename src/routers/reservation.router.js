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
reservationRouter.get('/company/:companyId', async function(req, res, next) {
  try {
    const { companyId } = req.params
    const requests = await fetchArrayOfRecords('users', companyId, 'company') 
    res.json(requests)
  } catch (e) {
    next(e)
  }
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
reservationRouter.get('/organization/:organizationId', async function(req, res, next) {
  try {
    const { organizationId } = req.params
    const requests = await fetchArrayOfRecords('users', organizationId, 'organization') 
    res.json(requests)
  } catch (e) {
    next(e);
  }
})

export default reservationRouter;

