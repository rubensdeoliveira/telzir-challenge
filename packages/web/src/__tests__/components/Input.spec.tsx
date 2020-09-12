import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { MdTimer } from 'react-icons/md'
import Input from '../../components/Input'

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'callDuration',
        defaultValue: '',
        error: '',
        registerField: jest.fn()
      }
    }
  }
})

describe('Input component', () => {
  it('should be able to render a input', () => {
    const { getByPlaceholderText } = render(
      <Input
        name="callDuration"
        placeholder="Tempo de chamada"
        icon={MdTimer}
      />
    )

    expect(getByPlaceholderText('Tempo de chamada')).toBeTruthy()
  })

  it('should render highlight on input focus', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input
        name="callDuration"
        placeholder="Tempo de chamada"
        icon={MdTimer}
      />
    )

    const inputElement = getByPlaceholderText('Tempo de chamada')
    const containerElement = getByTestId('input-container')

    fireEvent.focus(inputElement)

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        'border-color: var(--color-button-border);'
      )
      expect(containerElement).toHaveStyle('color: var(--color-button-border);')
    })

    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(containerElement).toHaveStyle(
        'border-color: var(--color-input-background);'
      )
      expect(containerElement).toHaveStyle('color: var(--color-text-primary);')
    })
  })

  it('should keep input border highlight when field is filled', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Input
        name="callDuration"
        placeholder="Tempo de chamada"
        icon={MdTimer}
      />
    )

    const inputElement = getByPlaceholderText('Tempo de chamada')
    const containerElement = getByTestId('input-container')

    fireEvent.change(inputElement, {
      target: { value: '100' }
    })

    fireEvent.blur(inputElement)

    await waitFor(() => {
      expect(containerElement).toHaveStyle('color: var(--color-button-border);')
    })
  })
})
