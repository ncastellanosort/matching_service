import { Router } from 'express'

const bookRouter = Router()

// traer las reservas que tiene cada una desde la bd
bookRouter.get('/company/:companyId', function(req, res) {
})

bookRouter.get('/organization/:organizationId', function(req, res) {
})

export default bookRouter;
