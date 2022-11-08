import { pokeApi } from '../../../../api';
import { setPokemons, startFetch, stopFetch } from '../';

export const getPokemons = (page = 0) => {

  // Thunk:
  return async (dispatch, getState) => {

    dispatch(startFetch());

    const limit = 10;
    const url = `/pokemon?limit=${limit}&offset=${page * limit}`;

    const { data } = await pokeApi.get(url);
    const pokemons = data.results;

    console.warn('pokeApi.get', pokemons);

    dispatch(setPokemons({
      pokemons,
      page,
    }));

    const state = getState()
    console.warn('state', state);

    dispatch(stopFetch());
  }
}