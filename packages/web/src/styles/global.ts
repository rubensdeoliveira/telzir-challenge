import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 16px Roboto, sans-serif;
}

:root {
  --color-background: #f3f2f7;
  --color-text-primary: #383640;
  --color-text-secondary: #A9A5B6;
  --color-input-background: #dad3f8;
  --color-input-text: #5b66c5;
  --color-button-border: #707AEA;
  --color-button-border-text: #fff;
  --color-result-card-1: #ABDFF9;
  --color-result-card-2: #6D90C6;
}

button {
  cursor: pointer;
}

`
