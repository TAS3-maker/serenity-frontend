import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext.jsx'
import { FAQProvider } from './FAQContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider><FAQProvider><App /></FAQProvider></ThemeProvider>
  </StrictMode>,
)
