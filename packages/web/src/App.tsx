import React from 'react'
import GlobalStyle from './styles/global'
import Dashboard from './pages/Dashboard'
import AppProvider from './hooks'

const App: React.FC = () => (
  <>
    <AppProvider>
      <Dashboard />
    </AppProvider>
    <GlobalStyle />
  </>
)

export default App
