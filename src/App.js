import {useState, useEffect} from 'react'
import './App.css'
import Pokemon from './components/Pokemon'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20');
  const [pokemonObj, setPokemonObj] = useState([]);
  
  const getPokemons = async () => {
    const res = await fetch(url);
    const data = await res.json()
    // console.log(data);
    setPokemons(data.results);

    // next data url
    setUrl(data.next);

    createPokemon(data.results);
    console.log('pokemonObj = ', pokemonObj)
  }

  const createPokemon = () => {
    const _url = 'https://pokeapi.co/api/v2/pokemon/';
    setPokemonObj([]);
    pokemons.forEach(async (pokemon) => {
      const res = await fetch(`${_url}${pokemon.name}`)
      const data = await res.json();
      setPokemonObj(current => [...current, data])
    })
  }

  useEffect(()=> {
    getPokemons();

  }, [])

  return (
    <div className="app-container">
      <article>
        <h1>포케몬 진화 도감</h1>
        <ul className="pokemon-list">
          {
            pokemonObj.map((pokemon, index) => {
              return (
                <li key={index} className={pokemon.types[0].type.name}>
                  {/* <div>{pokemon.name}</div> */}
                  <Pokemon 
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other.dream_world.front_default}
                    type={pokemon.types[0].type.name}
                    key={pokemon.id}
                  />
                </li>
              )
            })
          }
        </ul>
        <button className="load-btn" onClick={getPokemons}>next data</button>
      </article>
    </div>
  );
}

export default App;
