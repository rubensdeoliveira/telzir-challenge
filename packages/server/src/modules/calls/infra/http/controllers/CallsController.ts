import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CalcCallsCostService from '@modules/calls/services/CalcCallsCostService'

export default class CallsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const calcCallCost = container.resolve(CalcCallsCostService)

    const appointment = await calcCallCost.execute({
      origin: '011',
      destination: '016',
      callDuration: 30,
      plan: 'FaleMais 30'
    })

    return response.json(appointment)
  }
}
