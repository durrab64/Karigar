import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { DataProvider } from './context/DataContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'

import ErrorBoundary from './components/ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <DataProvider>
          <AuthProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </AuthProvider>
        </DataProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
