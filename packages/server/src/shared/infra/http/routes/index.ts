import { Router } from 'express'

import callsRoutes from '@modules/calls/infra/http/routes/calls.routes'

const routes = Router()

routes.use('/', callsRoutes)

export default routes
