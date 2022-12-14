import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store';

import CounterApp from './CounterApp'
import PokeApp from './PokeApp'
import TodosApp from './TodosApp'
import './index.css'


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <h1>Redux Toolkit</h1>
      <h2>Redux State - Thunk - RKT Query</h2>
      <hr />
      <CounterApp />
      <hr />
      <PokeApp />
      <hr />
      <TodosApp />
    </Provider>
  </React.StrictMode>
)
