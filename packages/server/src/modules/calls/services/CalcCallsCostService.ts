import { injectable, inject } from 'tsyringe'

import ICallsRepository from '../repositories/ICallsRepository'
import AppError from '@shared/errors/AppError'

interface IRequest {
  origin: string
  destination: string
  callDuration: number
  plan: string
}

interface IResponse {
  costWithPlan: number
  costWithoutPlan: number
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
  }: IRequest): IResponse {
    const isValidCall = this.callsRepository.isValidCall({
      origin,
      destination
    })

    if (!isValidCall) {
      throw new AppError('Combinação de origem/destino incorreta')
    }

    const isValidPlan = this.callsRepository.isValidPlan(plan)

    if (!isValidPlan) {
      throw new AppError('Plano de chamadas inválido')
    }

    const costWithPlan = this.callsRepository.calcCallPriceWithPlan({
      origin,
      destination,
      callDuration,
      plan
    })

    const costWithoutPlan = this.callsRepository.calcCallPriceWithoutPlan({
      origin,
      destination,
      callDuration
    })

    return { costWithPlan, costWithoutPlan }
  }
}

export default CalcCallsCostService
