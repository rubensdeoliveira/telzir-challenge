import { Router } from 'express'

const callsRouter = Router()

callsRouter.get('/', (request, response) =>
  response.json({ message: 'Hello World' })
)

export default callsRouter
