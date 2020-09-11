import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface IContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<IContainerProps>`
  background: var(--color-input-background);
  padding: 1rem;
  width: 100%;

  border: 2px solid var(--color-input-background);
  color: var(--color-text-primary);

  display: flex;
  align-items: center;

  & + div {
    margin-top: 1rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(--color-button-border);
      border-color: var(--color-button-border);
    `}

  ${props =>
    props.isFilled &&
    css`
      color: var(--color-button-border);
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--color-text-primary);

    &::placeholder {
      color: var(--color-text-primary);
    }
  }

  svg {
    margin-right: 1rem;
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 1rem;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`
