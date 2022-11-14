# Redux Toolkit Guide

Redux vs React-Redux vs Redux Toolkit

[**Redux**](https://redux.js.org/)

- A Predictable State Container for JS Apps.
- **Pattern** based in reducers, actions and store, for state management.
- It is a standalone library that can be used with any UI library.

[**React-Redux**](https://react-redux.js.org/)

- Library that provides bindings between Redux and React.
- Provides a series of components, hooks and functions to make the connection between Redux and React easier. for example: `Provider`, `useSelector`, `useDispatch`, `connect`, etc.
- The problem of using only react-redux is **the boilerplate code and the complexity to provide state and actions to the components** (mapStateToProps and mapDispatchToProps via connect).

[**Redux-Toolkit**](https://redux-toolkit.js.org/)

- Library that provides a set of tools to help you write Redux logic more easily.
- Provides a set of functions to simplify the creation of reducers, actions and store. For example:  `configureStore`, `createSlice`, `createAction`, etc.
- **Best alternative to use Redux with React, because it is a simpler and more efficient way to use Redux**.

<br>

## Installation

`pnpm add react-redux @reduxjs/toolkit`

<br>

## Usage (basic example app)

<br>

### Store

```js
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {},
})
```

<br>

### Provider

```js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
```

<br>

### Slice

createSlice is a function that accepts an **initial state**, an object **full of reducer functions**, and a **slice name**, and return an object with **reducer** to pass to the store, and **actions** to dispatch.

```js
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
```

Note: **"Mutating" logic in reducers**

Redux Toolkit allows us to write "mutating" logic in reducers. It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state" and produces a brand new immutable state based off those changes.

With this approach, we can write simpler, more intuitive reducers that look like this:

```js
increment: (state) => {
  state.counter++;
},
```

instead of this:

```js
increment: (state) => {
  return { ...state, counter: state.counter + 1 };
},
```

<br>

### Update Store

```js
import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './slices/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

<br>

### Use Redux State and Actions in React Components

```js
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, reset } from "./store/slices/counter";

function App() {

  // const [counter, setCounter] = useState(0);
  // const handleIncrement = () => setCounter(counter + 1);

  const { counter } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleIncrementByAmount = () => dispatch(incrementByAmount(5));
  const handleReset = () => dispatch(reset());

  return (
    <div className="app">
      <h1>Counter App</h1>
      <h2>Count: {counter}</h2>
      <div className="actions">
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <button onClick={handleIncrementByAmount}>Increment by 5</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}
```

Done!

<hr>
<br>

### Redux is based in 3 principles:

- **Single source of truth**: The state of your whole application is stored in an object tree within a single store.
- **State is read-only**: The only way to change the state is to emit an action, an object describing what happened.
- **Changes are made with pure functions**: To specify how the state tree is transformed by actions, you write pure reducers.

<br>

### Redux is based in 3 concepts:

- **Store**: The store is the object that brings them together. The store has the following responsibilities:
  - Holds application state;
  - Allows access to state via `getState()`;
  - Allows state to be updated via `dispatch(action)`;
  - Registers listeners via `subscribe(listener)`;
  - Handles unregistering of listeners via the function returned by `subscribe(listener)`.

- **Actions**: Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using `store.dispatch()`.

- **Reducers**: Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.

<hr>
<br>

### The implementation with react hooks (useReducer and useContext), would look like this:

```js
// countReducer.js
const countReducer = (state = {}, action) => {
  switch (action.type) {
    case types.INCREMENT:
        // ...
        return newState;
    case types.DECREMENT:
        // ...
        return newState;
    // ...
  }
}

// contextApp.js
import { useReducer } from 'react';
import countReducer from './countReducer';

const contextApp = () => {

const [state, dispatch] = useReducer(countReducer, initialState, initializer);


  // the reducer actions have to be provided by the context, to be consumed by components.

  const handleIncrement = () => {
      // ...
      dispatch({
          type: 'INCREMENT',
          payload: 1
      });
  }

  const dataProvided = {
    state,
    handleIncrement
  };
  const Context = createContext();

  <Context.Provider value={ dataProvided }>
      <App />
  </Context.Provider>
}
```

However, this implementation is not recommended.

Redux is a better solution for managing state in React applications.

**And the implementation with Redux Toolkit is even simpler and more efficient.**

Quote:
*New **context** is ready to be used for low frequency unlikely updates (like local/theme). It's also good to use it in the same way as old context was used. for example for static values and then propagate update through subscriptions. **It's not ready to be used as a replacement for all Flux-like state propagation.***

Refference:

- [React Context vs Redux - Who wins?](https://youtu.be/OvM4hIxrqAw)
- [useContext() + useReducer() = Magic?](https://youtu.be/R_7XRX7nLsw)

<br>
<hr>
<br>

## [Async Logic and Data Fetching](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)

### **Redux Middleware and Side Effects**

By itself, a Redux store doesn't know anything about async logic. It only knows how to synchronously dispatch actions, update the state by calling the root reducer function, and notify the UI that something has changed. Any asynchronicity has to happen outside the store.

Earlier, we said that Redux reducers must never contain "side effects". **A "side effect" is any change to state or behavior that can be seen outside of returning a value from a function**. Some common kinds of side effects are things like:

- Logging a value to the console.
- Saving a file.
- Setting an async timer.
- Making an AJAX HTTP request.
- Modifying some state that exists outside of a function, or mutating arguments to a function.
- Generating random numbers or unique random IDs (such as Math.random() or Date.now()).

<br>

### **THUNK**: Writing an Async Function Middleware (Not Middleware)

Unlike middlewares, which are functions that can inspect every action that passes through the store, **thunks are async functions that can be dispatched like normal actions and inside them, we can call dispatch() to dispatch actions as needed**.

Thunks can access to dispatch and getState so that we can interact with the store and inspect the current state and dispatch actions themselves.

Thunks are not part of the Redux core.

```js
// thunks/getPokemons.js

export const getPokemons = (page = 0) => {

  // Return Thunk:
  return async (dispatch, getState) => {

    // can dispatch actions
    dispatch(startFetch());

    const limit = 10;
    const url = `/pokemon?limit=${limit}&offset=${page * limit}`;

    const { data } = await pokeApi.get(url);
    const { results: pokemons } = data;

    dispatch(setPokemons({
      pokemons,
      page,
    }));

    // can access to the state
    const state = getState()

    dispatch(stopFetch());
  }
}
```

```js
// app.js

const dispatch = useDispatch()
const { page, pokemons, loading } = useSelector(state => state.poke)

useEffect(() => {
  // dispatch(thunk)
  dispatch(getPokemons(page))
}, [])

const handleNextPage = () => dispatch(getPokemons(page + 1));
```

<hr>
<br>

## [RKT Query](https://redux-toolkit.js.org/rtk-query/overview)

Is a **powerful data fetching and caching tool**. It is designed to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & caching logic yourself.

RTK Query is an optional addon included in the Redux Toolkit package.

Help us with:

- Tracking loading state in order to show UI spinners.
- Avoiding duplicate requests for the same data.
- Optimistic updates to make the UI feel faster.
- Managing cache lifetimes as the user interacts with the UI.

RTK Query takes inspiration from other tools that have pioneered solutions for data fetching, like Apollo Client, React Query, Urql, and SWR, but adds a unique approach to its API design:

- API endpoints are defined ahead of time, including how to generate query parameters from arguments and transform responses for caching.
- RTK Query can also generate React hooks that encapsulate the entire data fetching process, provide data and isLoading fields to components, and manage the lifetime of cached data as components mount and unmount.

<br>

### APIs

- `createApi()`: The core of RTK Query's functionality. It allows you to define a **set of endpoints describe how to retrieve data from a series of endpoints**, including configuration of how to fetch and transform that data. In most cases, you should use this **once per app, with "one API slice per base URL"** as a rule of thumb.
- `fetchBaseQuery()`: A small wrapper around fetch that aims to simplify requests. Intended as the recommended baseQuery to be used in createApi for the majority of users.

<br>

### Usage

**Create an API Slice:**

```js
import { createApi } from '@reduxjs/toolkit/query'

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react'
```

Defining an `API slice` that lists the server's base URL and which endpoints we want to interact with:

```js
// Define a service using a base URL and expected endpoints
export const todosApi = createApi({

  reducerPath: 'todosApi',

  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),

  endpoints: (builder) => ({

    getTodos: builder.query({
      query: () => `/todos`,
    }),

    getTodoById: builder.query({
      query: (id) => `/todos/${id}`,
    }),

  }),
});

// Export `query hooks`, which are auto-generated based on the defined endpoints.

const {
  useGetTodosQuery,
  useGetTodoByIdQuery,
} = todosApi;

```

**Configure the Store:**

The "API slice" also contains an auto-generated Redux slice reducer and a custom middleware that manages subscription lifetimes. Both of those need to be added to the Redux store:

```js
import { configureStore } from '@reduxjs/toolkit'
import { todosApi } from './RKTQuery'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [todosApi.reducerPath]: todosApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
})
```

**Use Hooks in Components:**

```js
import { useGetTodosQuery } from './store/RKTQuery'

const TodosApp = () => {

  // Using a query hook automatically fetches data and returns query values

  const {
    data,
    isLoading,
    error,
    isFetching,
  } = useGetTodosQuery();
}

```