import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import reportWebVitals from './reportWebVitals'
import { mockServer } from './mock'
import Dashboard from './features/questions/Dashboard'
import './style'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  </React.StrictMode>,
  document.getElementById('page')
)

// Wrap start the mock server in NODE_ENV=development for the production build
mockServer()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
