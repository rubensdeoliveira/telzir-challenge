import ICallsRepository from '@modules/calls/repositories/ICallsRepository'

import ICalcCallCostWithPlanDTO from '@modules/calls/dtos/ICalcCallCostWithPlanDTO'
import ICalcCallCostWithoutPlanDTO from '@modules/calls/dtos/ICalcCallCostWithoutPlanDTO'
import IIsValidCallDTO from '@modules/calls/dtos/IIsValidCallDTO'

interface ICall {
  origin: string
  destination: string
  minuteCost: number
}

interface IPlan {
  name: string
  discount: number
}

class CallsRepository implements ICallsRepository {
  private acceptedPlans: IPlan[] = [
    { name: 'FaleMais 30', discount: 30 },
    { name: 'FaleMais 60', discount: 60 },
    { name: 'FaleMais 120', discount: 120 }
  ]

  private acceptedCalls: ICall[] = [
    { origin: '011', destination: '016', minuteCost: 1.9 },
    { origin: '016', destination: '011', minuteCost: 2.9 },
    { origin: '011', destination: '017', minuteCost: 1.7 },
    { origin: '017', destination: '011', minuteCost: 2.7 },
    { origin: '011', destination: '018', minuteCost: 0.9 },
    { origin: '018', destination: '011', minuteCost: 1.9 }
  ]

  public isValidCall({ origin, destination }: IIsValidCallDTO): boolean {
    return Boolean(
      this.acceptedCalls.find(
        acceptedCall =>
          acceptedCall.origin === origin &&
          acceptedCall.destination === destination
      )
    )
  }

  public isValidPlan(plan: string): boolean {
    return Boolean(
      this.acceptedPlans.find(acceptedPlan => acceptedPlan.name === plan)
    )
  }

  public calcCallPriceWithPlan({
    origin,
    destination,
    callDuration,
    plan
  }: ICalcCallCostWithPlanDTO): number | undefined {
    const findedCall = this.acceptedCalls.find(
      acceptedCall =>
        acceptedCall.origin === origin &&
        acceptedCall.destination === destination
    )

    const findedPlan = this.acceptedPlans.find(
      acceptedPlan => acceptedPlan.name === plan
    )

    if (findedCall && findedPlan) {
      const cost =
        (callDuration - findedPlan.discount) * findedCall.minuteCost * 1.1
      const formattedCost = cost > 0 ? Number(cost.toFixed(2)) : 0

      return formattedCost
    } else {
      return undefined
    }
  }

  public calcCallPriceWithoutPlan({
    origin,
    destination,
    callDuration
  }: ICalcCallCostWithoutPlanDTO): number | undefined {
    const findedCall = this.acceptedCalls.find(
      acceptedCall =>
        acceptedCall.origin === origin &&
        acceptedCall.destination === destination
    )

    if (findedCall) {
      const cost = callDuration * findedCall.minuteCost
      const formattedCost = cost > 0 ? Number(cost.toFixed(2)) : 0

      return formattedCost
    } else {
      return undefined
    }
  }
}

export default CallsRepository
