import ICalcCallCostWithPlanDTO from '../dtos/ICalcCallCostWithPlanDTO'
import ICalcCallCostWithoutPlanDTO from '../dtos/ICalcCallCostWithoutPlanDTO'

export default interface ICallsRepository {
  calcCallPriceWithPlan(data: ICalcCallCostWithPlanDTO): number | undefined
  calcCallPriceWithoutPlan(
    data: ICalcCallCostWithoutPlanDTO
  ): number | undefined
}
