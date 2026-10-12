import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { siteData } from './data/siteData.js'
import { applyTheme, applySeo } from './lib/theme.js'

applyTheme(siteData.theme)
applySeo(siteData.seo)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
