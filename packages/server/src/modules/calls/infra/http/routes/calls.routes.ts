import { Router } from 'express'
import CallsController from '../controllers/CallsController'

const callsRouter = Router()
const callsController = new CallsController()

callsRouter.get('/calc', callsController.show)

export default callsRouter
