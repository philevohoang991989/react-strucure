import React from 'react'
import { Button } from 'antd'
import { I18nextProvider } from 'react-i18next'
import i18n from 'locales/i18n'
import logo from './logo.svg'
import Home from 'pages/home'
import './App.less'

function App() {
  return (
    <div className='App'>
      <I18nextProvider i18n={i18n}>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
          <Button type='primary'>Button</Button>
        </header>
        <Home />
      </I18nextProvider>
    </div>
  )
}

export default App
