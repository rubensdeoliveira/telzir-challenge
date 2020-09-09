import ICalcCallCostWithPlanDTO from '../dtos/ICalcCallCostWithPlanDTO'
import ICalcCallCostWithoutPlanDTO from '../dtos/ICalcCallCostWithoutPlanDTO'
import IIsValidCallDTO from '../dtos/IIsValidCallDTO'

export default interface ICallsRepository {
  isValidCall(data: IIsValidCallDTO): boolean
  isValidPlan(plan: string): boolean
  calcCallPriceWithPlan(data: ICalcCallCostWithPlanDTO): number | undefined
  calcCallPriceWithoutPlan(
    data: ICalcCallCostWithoutPlanDTO
  ): number | undefined
}
