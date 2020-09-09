import ICalcCallsCostDTO from '../dtos/ICalcCallsCostDTO'

export default interface IAppointmentsRepository {
  calcCallPriceWithPlan(data: ICalcCallsCostDTO): Promise<number>
  calcCallPriceWithoutPlan(data: ICalcCallsCostDTO): Promise<number>
}
