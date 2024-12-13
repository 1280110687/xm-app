import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { IntlProvider, useIntl } from '@/i18n'
import Router from '@/router'

function App() {
  const [ count, setCount ] = useState(0)

  return (
    <>
      <IntlProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </IntlProvider>
    </>
  )
}

export default App
