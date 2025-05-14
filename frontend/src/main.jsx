import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import { RouterProvider } from 'react-router-dom'
// import './index.css'
import routes from './Routes.jsx'
import store from './Redux/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={routes} />
  </Provider>
)