import React from 'react'

import { render, fireEvent, act, waitFor } from '@testing-library/react'
import selectEvent from 'react-select-event'
import AxiosMock from 'axios-mock-adapter'
import api from '@telzir-challenge/axios-config'

import Dashboard from '../../pages/Dashboard'

const mockedHistoryPush = jest.fn()
const mockedAddToast = jest.fn()

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    })
  }
})

jest.mock('react-chartjs-2', () => ({
  Bar: () => null
}))

const apiMock = new AxiosMock(api)

describe('Dashboard page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear()
  })

  it('should be able to show call calc', async () => {
    const { getByPlaceholderText, getByText } = render(<Dashboard />)

    const callDurationField = getByPlaceholderText('Tempo da chamada (minutos)')
    const originField = getByText('Selecione o código de origem...')
    const destinationField = getByText('Selecione o código de destino...')
    const planField = getByText('Selecione o plano...')
    const buttonElement = getByText('Calcular')

    apiMock.onGet('calls/calc').reply(200, {
      costWithPlan: 146.3,
      costWithoutPlan: 190
    })

    fireEvent.change(callDurationField, {
      target: { value: 100 }
    })

    await selectEvent.select(originField, '011')
    await selectEvent.select(destinationField, '011')
    await selectEvent.select(planField, 'FaleMais 30')

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    expect(getByText('Sem plano')).toBeTruthy()
  })

  it('should call a toast if user put wrong data', async () => {
    const { getByPlaceholderText, getByText } = render(<Dashboard />)

    const callDurationField = getByPlaceholderText('Tempo da chamada (minutos)')
    const originField = getByText('Selecione o código de origem...')
    const destinationField = getByText('Selecione o código de destino...')
    const planField = getByText('Selecione o plano...')
    const buttonElement = getByText('Calcular')

    apiMock.onGet('calls/calc').reply(200, {
      costWithPlan: 146.3,
      costWithoutPlan: 190
    })

    fireEvent.change(callDurationField, {
      target: { value: 'wrong-data' }
    })

    await selectEvent.select(originField, '011')
    await selectEvent.select(destinationField, '011')
    await selectEvent.select(planField, 'FaleMais 30')

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error'
        })
      )
    })
  })

  it('should call a toast if calc call throw a error', async () => {
    const { getByPlaceholderText, getByText } = render(<Dashboard />)

    const callDurationField = getByPlaceholderText('Tempo da chamada (minutos)')
    const originField = getByText('Selecione o código de origem...')
    const destinationField = getByText('Selecione o código de destino...')
    const planField = getByText('Selecione o plano...')
    const buttonElement = getByText('Calcular')

    apiMock.onGet('calls/calc').networkError()

    fireEvent.change(callDurationField, {
      target: { value: 100 }
    })

    await selectEvent.select(originField, '011')
    await selectEvent.select(destinationField, '011')
    await selectEvent.select(planField, 'FaleMais 30')

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error'
        })
      )
    })
  })

  it('should reset calc if reset button is pressed', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Dashboard />
    )

    const callDurationField = getByPlaceholderText('Tempo da chamada (minutos)')
    const originField = getByText('Selecione o código de origem...')
    const destinationField = getByText('Selecione o código de destino...')
    const planField = getByText('Selecione o plano...')
    const buttonElement = getByText('Calcular')

    apiMock.onGet('calls/calc').reply(200, {
      costWithPlan: 146.3,
      costWithoutPlan: 190
    })

    fireEvent.change(callDurationField, {
      target: { value: 100 }
    })

    await selectEvent.select(originField, '011')
    await selectEvent.select(destinationField, '011')
    await selectEvent.select(planField, 'FaleMais 30')

    await act(async () => {
      fireEvent.click(buttonElement)
    })

    await act(async () => {
      fireEvent.click(getByTestId('button-reset-calc'))
    })

    expect(getByText('Calcule sua chamada')).toBeTruthy()
  })
})
