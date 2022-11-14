import { configureStore } from '@reduxjs/toolkit'
import { counterReducer, pokeReducer } from './slices'
import { todosApi } from './RKTQuery'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    poke: pokeReducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
})


/*

RKT QUERY

create a new reducer input in the store

todosApi is a RKTQuery that update the state of todosApi.reducerPath (todosApi) in the store.
this need configure the store with the middleware: todosApi.middleware

STORE:

{
  todosApi: {
    queris: {
      getTodos: {
        status,
        data: [...],
        ...
      },
      getTodosById(1): {
          status,
          data: [...],
          ...
      }
    }
  },
  ...
}

*/