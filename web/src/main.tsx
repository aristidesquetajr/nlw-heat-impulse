import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

import './styles/global.css'
import { AuthProvider } from './contexts/auth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>,
)
