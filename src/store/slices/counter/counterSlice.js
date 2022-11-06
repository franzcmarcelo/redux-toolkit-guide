import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    counter: 0,
  },
  reducers: {
    increment: (state) => {
      state.counter++;
    },
    decrement: (state) => {
      state.counter--;
    },
    incrementByAmount: (state, action) => {
      state.counter += action.payload
    },
    reset: (state) => {
      state.counter = 0;
    }
  },
})

export const {
  increment,
  decrement,
  incrementByAmount,
  reset,
} = counterSlice.actions;