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
  ComFaleMais: number
  SemFaleMais: number
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

    if (costWithPlan === undefined || costWithoutPlan === undefined) {
      throw new AppError('Ocorreu um erro no cálculo da chamada')
    }

    return { ComFaleMais: costWithPlan, SemFaleMais: costWithoutPlan }
  }
}

export default CalcCallsCostService
