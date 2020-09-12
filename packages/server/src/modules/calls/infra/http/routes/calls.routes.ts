import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import CallsController from '../controllers/CallsController'

const callsRouter = Router()
const callsController = new CallsController()

callsRouter.get(
  '/calc',
  celebrate({
    [Segments.QUERY]: {
      origin: Joi.string().required(),
      destination: Joi.string().required(),
      callDuration: Joi.number().required(),
      plan: Joi.string().required()
    }
  }),
  callsController.show
)

export default callsRouter
