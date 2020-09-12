import CallsRepository from '../repositories/implementations/CallsRepository'
import CalcCallsCostService from './CalcCallsCostService'

let callsRepository: CallsRepository
let calcCallsCost: CalcCallsCostService

describe('CalcCallsCostService test', () => {
  beforeEach(() => {
    callsRepository = new CallsRepository()

    calcCallsCost = new CalcCallsCostService(callsRepository)
  })

  it('should be able to calculate call cost', () => {
    let callCost = calcCallsCost.execute({
      origin: '011',
      destination: '016',
      callDuration: 20,
      plan: 'FaleMais 30'
    })

    expect(callCost.costWithPlan).toBe(0)
    expect(callCost.costWithoutPlan).toBe(38)

    callCost = calcCallsCost.execute({
      origin: '011',
      destination: '017',
      callDuration: 80,
      plan: 'FaleMais 60'
    })

    expect(callCost.costWithPlan).toBe(37.4)
    expect(callCost.costWithoutPlan).toBe(136)

    callCost = calcCallsCost.execute({
      origin: '018',
      destination: '011',
      callDuration: 200,
      plan: 'FaleMais 120'
    })

    expect(callCost.costWithPlan).toBe(167.2)
    expect(callCost.costWithoutPlan).toBe(380)
  })

  it('should not be able to calculate call cost with wrong codes', () => {
    expect(() => {
      calcCallsCost.execute({
        origin: 'wrong-data',
        destination: 'wrong-data',
        callDuration: 20,
        plan: 'FaleMais 30'
      })
    }).toThrow()
  })

  it('should not be able to calculate call cost with wrong plan', () => {
    expect(() => {
      calcCallsCost.execute({
        origin: '011',
        destination: '016',
        callDuration: 20,
        plan: 'wrong-data'
      })
    }).toThrow()
  })
})
