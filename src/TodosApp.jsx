import { useState } from 'react'
import { useGetTodosQuery, useGetTodoByIdQuery } from './store/RKTQuery'

const TodosApp = () => {

  const {
    data: dataTodos = [],
    isLoading: isLoadingTodos,
    isFetching: isFetchingTodos
  } = useGetTodosQuery();

  // RKT Query store data in cache,
  // so if you call the same query again, it will return the data from cache, not from the server
  // after a lapse of time, the data will be removed from the cache, we can see this in the redux devtools
  // for example: todosApi > queries > getTodoById(1), getTodoById(2), etc. is stored in cache

  const [idTodo, setIdTodo] = useState(1)

  const {
    data: dataTodo,
    isLoading: isLoadingTodo,
    isFetching: isFetchingTodo
  } = useGetTodoByIdQuery(idTodo);

  return (
    <div className="app">
      <h1>Todos App</h1>

      <h2>RKT Query (powerful data fetching and caching tool)</h2>

      <h3>Get all todos</h3>

      {
        isLoadingTodos
          ? (
            <p>Loading todos...</p>
          )
          : (
            <div>
              {
                dataTodos.map(todo => (
                  <div key={todo.id}>
                    <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} >{todo.title} </p>
                  </div>
                )).slice(0, 10)
              }
            </div>
          )
      }

      <h3>Get one todo by id</h3>

      {
        isLoadingTodo
          ? (
            <p>Loading...</p>
          ) : (
            <>
              <p><strong>{dataTodo.id} - </strong>{dataTodo.title}</p>
              <button onClick={() => setIdTodo(idTodo - 1)}>Prev todo</button>
              <button onClick={() => setIdTodo(idTodo + 1)}>Next todo</button>
            </>
          )
      }

    </div>
  )
}

export default TodosApp