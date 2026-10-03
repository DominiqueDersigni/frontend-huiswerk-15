import './App.css'
import axios from "axios";
import {useEffect, useState} from "react";
import Card from './components/card/card';
import Logo from './assets/Logo.png';

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nextpage, setNextPage] = useState(null);
    const [previouspage, setPreviousPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useEffect(() => {
        const controller = new AbortController();
        async function fetchPokemon() {
            setLoading(true);
            try {
                const result = await axios.get(url, { signal: controller.signal });
                console.log(result);
                setPokemons(result.data.results);
                setNextPage(result.data.next);
                setPreviousPage(result.data.previous);
            } catch (e) {
                console.error(e);
                setError(true);
            }
            setLoading(false);
        }
        fetchPokemon();

        return () => {
            controller.abort();
        }
    },[url] )


  return (
    <main>
        <section className="pokemon-logo-container">
            <img src={Logo} className="pokemon-logo" alt="Pokémon logo" />
        </section>
        <section className="buttons-container">
            <button disabled={!previouspage} onClick={() => setUrl(previouspage)}>Previous</button>
            <button disabled={!nextpage} onClick={() => setUrl(nextpage)}>Next</button>
        </section>
        <section>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de data</p>}
        </section>
        <section className="pokemon-cards-container">
        {pokemons.map((pokemon) => {
            return <Card key={pokemon.name} name={pokemon.name} />})
        }
        </section>
    </main>
  )
}

export default App
