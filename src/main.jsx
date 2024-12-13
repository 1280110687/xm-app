import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/themes/index.less'
import App from './App.jsx'
import 'virtual:windi.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
