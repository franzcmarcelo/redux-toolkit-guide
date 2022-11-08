import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokemons } from './store/slices/poke/thunks'

function PokeApp() {

  const dispatch = useDispatch()
  const { page, pokemons, loading } = useSelector(state => state.poke)

  useEffect(() => {
    // dispatch(thunk)
    dispatch(getPokemons(page))
  }, [])

  const handleNextPage = () => dispatch(getPokemons(page + 1));

  if (loading) return <h1>Loading pokes...</h1>

  return (
    <div className="app">
      <h1>Poke App</h1>

      <h2>Thunk (asynchronous action)</h2>

      <h2>Page: {page}</h2>

      <div className='pokesGrid'>
        {
          pokemons.map(pokemon => (
            <p key={pokemon.name}>{pokemon.name}</p>
          ))
        }
      </div>
      <button onClick={handleNextPage}>Next page</button>
    </div>
  )
}

export default PokeApp;