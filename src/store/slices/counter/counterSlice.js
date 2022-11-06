import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
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

const { reducer: counterReducer, actions } = counterSlice;
const { increment, decrement, incrementByAmount, reset } = actions;

export {
  // Reducer
  counterReducer,
  // Actions
  increment,
  decrement,
  incrementByAmount,
  reset,
}