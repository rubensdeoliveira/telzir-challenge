<h1 align="center">
<br>
Desafio Telzir
</h1>

<p align="center">
Este projeto foi desenvolvido para resolver um desafio proposto por uma empresa de tecnologia, com o objetivo de avaliar as habilidades de React dos candidatos.</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<div>
  <img src="repo/imgs/image1.png" alt="demo" height="425">
  <img src="repo/imgs/image2.png" alt="demo" height="425">
</div>

<hr />

## Telzir - Calculadora de chamadas

O sistema consiste em uma web app para cálculo de chamadas da empresa fictícia Telzir. O usuário tem a possibilidade ver quanto gastará nas suas chamadas e analisar se vale a pena aderir aos planos de chamada da empresa.

## API

Para o desenvolvimento das funcionalidades dessa aplicação, foi utilizada uma API, que foi criada utilizando Node.js (express).

## Layout

O layout da aplicação foi criado por mim. Trata-se de um layout responsivo que abrange as funcionalidades propostas do sistema.

## Funcionalidades do desafio

### Cálculo das chamadas

O sistema possui campos de texto e seletores para o usuário colocar as informações necessárias para o cálculo da chamada. 

### Gráfico de comparação

O sistema aponta um gráfico em forma de barra, que compara os gastos das chamadas com e sem o plano selecionado pelo usuário.

### Responsividade

O sistema deve poder ser utilizado em qualquer dispositivo, por isso o layout pensado foi responsivo.

## Testes

- Para rodar os testes entre nas pastas web e server e rode `yarn test`
```
cd packages
cd web
yarn test
```

```
cd packages
cd server
yarn test
```

- Para rodar o relatório de cobertura dos testes entre nas pastas web e server rode `yarn test:coverage`
```
cd packages
cd web
yarn test:coverage
```

```
cd packages
cd server
yarn test:coverage
```

## Como rodar

- Clone o projeto
- Entre na pasta server
- rode `yarn dev:server`
- Entre na pasta web
- rode `yarn start`

```
cd packages
cd server
yarn dev:server
```

```
cd packages
cd web
yarn start
```

## Licença

[LICENSE](https://opensource.org/licenses/MIT)

---

Created with passion by me 👨🏻‍💻
