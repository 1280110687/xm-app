import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from '@/i18n'
import Router from '@/router'

function App() {

  return (
    <IntlProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
