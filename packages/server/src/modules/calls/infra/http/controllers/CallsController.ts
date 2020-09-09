import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CalcCallsCostService from '@modules/calls/services/CalcCallsCostService'

export default class CallsController {
  public show(request: Request, response: Response): Response {
    const { origin, destination, callDuration, plan } = request.query

    console.log(request.query)

    const calcCallCost = container.resolve(CalcCallsCostService)

    const appointment = calcCallCost.execute({
      origin: String(origin),
      destination: String(destination),
      callDuration: Number(callDuration),
      plan: String(plan)
    })

    return response.json(appointment)
  }
}
