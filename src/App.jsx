import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Logo from './assets/Logo.png';

function App() {
        const [pokemon, setPokemon] = useState([]);

        useEffect(() => {
            async function fetchPokemon() {
                try {
                    const result = await axios.get("https://pokeapi.co/api/v2/pokemon/39/");
                    console.log(result);
                    setPokemon(result.data);
                } catch (e) {
                    console.error(e);
                }
            }
            fetchPokemon();
        },[] )




  return (
    <body>
    <section>
        <img src={Logo} className="pokemon-logo" />
    </section>
    <section>
        <div>
            <h1>Dit is pokemon:  {pokemon.name}</h1>
        </div>
    </section>
    </body>
  )
}

export default App
