import { Dashboard } from './views'
import { Provider } from 'react-redux'
import { store } from './store'
import './style'

const App = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  )
}

export default App
