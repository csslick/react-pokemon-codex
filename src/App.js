import {useState, useEffect} from 'react'
import './App.css'
import Pokemon from './components/Pokemon'

function App() {
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/?limit=20');
  const [pokemonObj, setPokemonObj] = useState([]);
  
  const getPokemons = async () => {
    // 1.pokemon 목록 조회
    const res = await fetch(url);
    const data = await res.json()
    // console.log(data);

    setUrl(data.next);  // next data url

    // 2.조회된 url에 링크된 포케몬 정보 조회
    const createPokemon = () => {
      const _url = 'https://pokeapi.co/api/v2/pokemon/';
      setPokemonObj([]);
      data.results.forEach(async (pokemon) => {
        const res = await fetch(`${_url}${pokemon.name}`)
        const data = await res.json();
        setPokemonObj(current => [...current, data])
      })
    }

    createPokemon();
    console.log('pokemonObj = ', pokemonObj)
  }

  useEffect(()=> {
    getPokemons();

  }, [])

  return (
    <div className="app-container">
      <article>
        <h1>포케몬 진화 도감</h1>
        <button className="load-btn" onClick={getPokemons}>next data</button>
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
      </article>
    </div>
  );
}

export default App;
