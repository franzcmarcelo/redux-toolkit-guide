import { createSlice } from '@reduxjs/toolkit'

const pokeSlice = createSlice({
  name: 'poke',
  initialState: {
    page: 0,
    pokemons: [],
    loading: false,
  },
  reducers: {
    startFetch: (state) => {
      state.loading = true
    },
    setPokemons: (state, action) => {
      state.page = action.payload.page;
      state.pokemons = action.payload.pokemons;
    },
    stopFetch: (state) => {
      state.loading = false
    }
  },
})

const { reducer: pokeReducer, actions } = pokeSlice;
const { startFetch, setPokemons, stopFetch } = actions;

export {
  // Reducer
  pokeReducer,
  // Actions
  startFetch,
  setPokemons,
  stopFetch,
}