import React, { useMemo } from 'react'

import { Container, ContainerRow } from './styles'
import { IconBaseProps } from 'react-icons'

interface IResultCardProps {
  title: string
  cost: number
  color: string
  icon: React.ComponentType<IconBaseProps>
  dark?: boolean
}

const ResultCard: React.FC<IResultCardProps> = ({
  title,
  cost,
  color,
  icon: Icon,
  dark
}) => {
  const costFormatted = useMemo(() => {
    return cost.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }, [cost])

  return (
    <Container color={color} dark={dark}>
      <ContainerRow>
        <Icon
          color={
            dark
              ? 'var(--color-button-border-text)'
              : 'var(--color-text-primary)'
          }
          size={60}
        />
        <h2>{title}</h2>
      </ContainerRow>

      <p>{costFormatted}</p>
    </Container>
  )
}

export default ResultCard
