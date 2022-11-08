import { configureStore } from '@reduxjs/toolkit'
import { counterReducer, pokeReducer } from './slices'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    poke: pokeReducer,
  },
})