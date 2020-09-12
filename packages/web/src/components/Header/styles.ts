import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem 0;
  width: 100%;
  background-color: var(--color-button-border);
  margin-bottom: 2.5rem;
`

export const Content = styled.div`
  max-width: 960px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    color: var(--color-text-primary);
    color: var(--color-button-border-text);
    text-align: center;

    @media (min-width: 1000px) {
      text-align: left;
    }
  }
`
