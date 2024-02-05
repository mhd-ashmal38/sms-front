import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Contextshare from './pages/Contextshare.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Contextshare>
      <App />
    </Contextshare>

  </React.StrictMode>,
)
