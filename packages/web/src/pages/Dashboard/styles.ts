import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: center;
`

export const Content = styled.main`
  width: 100%;
  max-width: 720px;

  display: flex;
  flex-direction: column;
  align-items: center;

  > button {
    background: var(--color-button-border);
    border: 0;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    margin-top: 2rem;
  }

  > button:hover {
    background: ${shade(0.2, '#707AEA')};
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    h1 {
      font-size: 3rem;
      color: var(--color-text-primary);
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.1rem;
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
    }
  }

  .chartjs-render-monitor {
    max-width: 100% !important;
  }
`

export const FormRow = styled.div`
  display: flex;

  width: 100%;
`

export const ResultCardRow = styled.div`
  display: flex;

  width: 100%;
`
