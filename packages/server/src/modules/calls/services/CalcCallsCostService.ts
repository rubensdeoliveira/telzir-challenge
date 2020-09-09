import { injectable, inject } from 'tsyringe'

import ICallsRepository from '../repositories/ICallsRepository'

interface IRequest {
  origin: string
  destination: string
  callDuration: number
  plan: string
}

@injectable()
class CalcCallsCostService {
  constructor(
    @inject('CallsRepository')
    private callsRepository: ICallsRepository
  ) {}

  public execute({
    origin,
    destination,
    callDuration,
    plan
  }: IRequest): number {
    const callCost = this.callsRepository.calcCallPriceWithPlan({
      origin,
      destination,
      callDuration,
      plan
    })

    if (callCost === undefined) {
      throw new Error('Chamada não encontrado')
    }

    return callCost
  }
}

export default CalcCallsCostService
