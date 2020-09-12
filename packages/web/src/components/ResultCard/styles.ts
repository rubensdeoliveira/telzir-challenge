import styled, { css } from 'styled-components'

interface IContainerProps {
  color: string
  dark?: boolean
}

export const Container = styled.div<IContainerProps>`
  ${props =>
    props.color &&
    css`
      background-color: ${props.color};
    `}

  width: 100%;
  padding: 1.5rem;

  margin: 0.5rem 0;

  @media (min-width: 768px) {
    margin: 2rem 0;
  }

  display: flex;
  flex-direction: column;

  border-radius: 10px;

  p {
    align-self: flex-end;
    font-size: 2rem;
    ${props =>
      props.dark
        ? css`
            color: var(--color-button-border-text);
          `
        : css`
            color: var(--color-text-primary);
          `}
  }

  h2 {
    font-size: 1.5rem;
    ${props =>
      props.dark
        ? css`
            color: var(--color-button-border-text);
          `
        : css`
            color: var(--color-text-primary);
          `}
  }

  svg {
    ${props =>
      props.dark
        ? css`
            color: var(--color-button-border-text);
          `
        : css`
            color: var(--color-text-primary);
          `}
  }

  & + & {
    margin-left: 0;

    @media (min-width: 768px) {
      margin-left: 1rem;
    }
  }
`

export const ContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.5rem;
`
