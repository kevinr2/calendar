import React from 'react'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom/client'
import './styles.css'

import { CalendarioApp } from './CalendarioApp'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CalendarioApp />
    </Provider>
  </React.StrictMode>,
)
