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

  const [callCostWithPlan, setCallCostWithPlan] = useState(null)
  const [callCostWithoutPlan, setCallCostWithoutPlan] = useState(null)

  const formRef = useRef<FormHandles>(null)

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
        console.log(err.response.data.message)
      }
    },
    [initialCodeOptionsState, initialPlanOptionsState]
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
              />

              <Select
                name="destination"
                placeholder="Selecione o código de destino..."
                options={destinationOptions}
              />
            </FormRow>

            <Select
              name="plan"
              options={planOptions}
              placeholder="Selecione o plano..."
              onChange={handlePlanChange}
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
                cost={callCostWithoutPlan || 0}
                icon={RiEmotionNormalFill}
              />
              <ResultCard
                color="var(--color-result-card-2)"
                title={`Plano ${selectedPlan}`}
                cost={callCostWithPlan || 0}
                icon={RiEmotionHappyFill}
                dark
              />
            </ResultCardRow>
            <BarChart
              plan={selectedPlan || ''}
              costWithPlan={callCostWithPlan || 0}
              costWithoutPlan={callCostWithoutPlan || 0}
            />

            <button type="button" onClick={handleResetCalc}>
              <MdReplay color="var(--color-button-border-text)" size={45} />
            </button>
          </>
        ) : null}
      </Content>
    </Container>
  )
}

export default Dashboard
