import React, { useRef, useCallback, useState } from 'react'

import { Container, Content, FormRow, ResultCardRow } from './styles'
import Header from '../../components/Header'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { MdReplay, MdTimer } from 'react-icons/md'
import { RiEmotionNormalFill, RiEmotionHappyFill } from 'react-icons/ri'
import Select from '../../components/Select'
import api from '@telzir-challenge/axios-config'
import BarChart from '../../components/BarChart'
import ResultCard from '../../components/ResultCard'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import { useToast } from '../../hooks/toast'

interface ICalcCallCostData {
  origin: string
  destination: string
  callDuration: number
  plan: string
}

const Dashboard: React.FC = () => {
  const initialCodeOptionsState = [
    { value: '011', label: '011' },
    { value: '016', label: '016' },
    { value: '017', label: '017' },
    { value: '018', label: '018' }
  ]

  const initialPlanOptionsState = [
    { value: 'FaleMais 30', label: 'FaleMais 30' },
    { value: 'FaleMais 60', label: 'FaleMais 60' },
    { value: 'FaleMais 120', label: 'FaleMais 120' }
  ]

  const [originOptions] = useState(initialCodeOptionsState)
  const [destinationOptions] = useState(initialCodeOptionsState)
  const [planOptions] = useState(initialPlanOptionsState)

  const [selectedPlan, setSelectedPlan] = useState(null)

  const [formData, setFormData] = useState({})

  const [callCostWithPlan, setCallCostWithPlan] = useState<number | null>(null)
  const [callCostWithoutPlan, setCallCostWithoutPlan] = useState<number | null>(
    null
  )

  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const handlePlanChange = useCallback(({ value }) => {
    setSelectedPlan(value)
  }, [])

  const handleResetCalc = useCallback(() => {
    setCallCostWithPlan(null)
    setCallCostWithoutPlan(null)
  }, [])

  const handleSubmit = useCallback(
    async (data: ICalcCallCostData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          callDuration: Yup.number().typeError('Digite um número válido'),
          origin: Yup.string().required('Selecione o código de origem'),
          destination: Yup.string().required('Selecione o código de destino'),
          plan: Yup.string().required('Selecione o plano desejado')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        const response = await api.get('calls/calc', {
          params: data
        })

        const { costWithPlan, costWithoutPlan } = response.data

        setCallCostWithPlan(costWithPlan)
        setCallCostWithoutPlan(costWithoutPlan)
        setFormData({
          ...data,
          origin: initialCodeOptionsState.find(
            origin => origin.value === data.origin
          ),
          destination: initialCodeOptionsState.find(
            destination => destination.value === data.destination
          ),
          plan: initialPlanOptionsState.find(plan => plan.value === data.plan)
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          addToast({
            type: 'error',
            title: 'Erro ao calcular chamada',
            description: Object.values(errors)[0] || ''
          })

          return
        }

        addToast({
          type: 'error',
          title: 'Erro ao calcular chamada',
          description: 'Ocorreu um erro ao calcular a chamada, tente novamente.'
        })
      }
    },
    [addToast, initialCodeOptionsState, initialPlanOptionsState]
  )

  return (
    <Container>
      <Header />

      <Content>
        {callCostWithPlan != null && callCostWithoutPlan != null ? null : (
          <Form ref={formRef} onSubmit={handleSubmit} initialData={formData}>
            <h1>Calcule sua chamada</h1>
            <p>
              A Telzir se preocupa com o seu bolso, por isso oferecemos este
              serviço.
            </p>

            <Input
              name="callDuration"
              icon={MdTimer}
              placeholder="Tempo da chamada (minutos)"
              type="number"
            />

            <FormRow>
              <Select
                name="origin"
                placeholder="Selecione o código de origem..."
                options={originOptions}
                data-testid="origin-field"
              />

              <Select
                name="destination"
                placeholder="Selecione o código de destino..."
                options={destinationOptions}
                data-testid="destination-field"
              />
            </FormRow>

            <Select
              name="plan"
              options={planOptions}
              placeholder="Selecione o plano..."
              onChange={handlePlanChange}
              data-testid="plan-field"
            />

            <Button type="submit">Calcular</Button>
          </Form>
        )}

        {callCostWithPlan != null && callCostWithoutPlan != null ? (
          <>
            <ResultCardRow>
              <ResultCard
                color="var(--color-result-card-1)"
                title="Sem plano"
                cost={callCostWithoutPlan}
                icon={RiEmotionNormalFill}
              />
              <ResultCard
                color="var(--color-result-card-2)"
                title={`Plano ${selectedPlan}`}
                cost={callCostWithPlan}
                icon={RiEmotionHappyFill}
                dark
              />
            </ResultCardRow>
            <BarChart
              plan={selectedPlan || ''}
              costWithPlan={callCostWithPlan}
              costWithoutPlan={callCostWithoutPlan}
            />

            <button
              type="button"
              onClick={handleResetCalc}
              data-testid="button-reset-calc"
            >
              <MdReplay color="var(--color-button-border-text)" size={45} />
            </button>
          </>
        ) : null}
      </Content>
    </Container>
  )
}

export default Dashboard
