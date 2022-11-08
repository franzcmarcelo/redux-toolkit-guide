import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';

import CounterApp from './CounterApp'
import PokeApp from './PokeApp'
import './index.css'


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CounterApp />
      <hr />
      <PokeApp />
    </Provider>
  </React.StrictMode>
)
