import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CalcCallsCostService from '@modules/calls/services/CalcCallsCostService'

export default class CallsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const calcCallCost = container.resolve(CalcCallsCostService)

    const appointment = await calcCallCost.execute({
      origin: '',
      destination: '',
      callDuration: 0,
      plan: ''
    })

    return response.json(appointment)
  }
}
