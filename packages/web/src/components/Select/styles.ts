import styled from 'styled-components'
import ReactSelect from 'react-select'

export const StyledReactSelect = styled(ReactSelect)`
  width: 100%;

  & + & {
    margin-left: 1rem;
  }

  .react-select__control {
    background-color: var(--color-input-background);
    height: 56px;
    margin-bottom: 1rem;
  }

  .react-select__control:hover {
    border-color: var(--color-button-border);
  }

  .react-select__value-container {
    background-color: var(--color-input-background);
  }

  .react-select__indicators {
    background-color: var(--color-input-background);
  }

  .react-select__menu-list {
    background-color: var(--color-button-border);
  }

  .css-1okebmr-indicatorSeparator {
    background-color: var(--color-button-border);
  }

  .css-tlfecz-indicatorContainer {
    color: var(--color-button-border);
  }

  .css-1wa3eu0-placeholder {
    color: var(--color-text-primary);
  }

  .react-select__option {
    color: var(--color-button-border-text);
  }
`
