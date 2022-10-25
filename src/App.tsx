import React from 'react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import i18n from 'locales/i18n'
import { setupStore } from 'store'
import './App.less'
import RoutesApp from './routers'

function App() {
  const store = setupStore()
  return (
    <div className='App'>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <RoutesApp />
        </Provider>
      </I18nextProvider>
    </div>
  )
}

export default App
