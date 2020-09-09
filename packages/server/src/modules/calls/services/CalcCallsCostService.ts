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

  public async execute({
    origin,
    destination,
    callDuration,
    plan
  }: IRequest): Promise<void> {}
}

export default CalcCallsCostService
