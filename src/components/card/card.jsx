import axios from "axios";
import {useEffect, useState} from "react";


function Card({name}) {
const [pokemon, setPokemon] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

useEffect(() => {
    const controller = new AbortController();
    async function fetchPokemon() {
        setLoading(true);
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`, { signal: controller.signal });
            console.log(result);
            setPokemon(result.data);
        } catch (e) {
            console.error(e);
            setError(true)
        }
        setLoading(false);
    }
    fetchPokemon();
    return () => {
        controller.abort();
    }
},[] )

    return (
        <section>
            {loading && <p>Bezig met laden...</p>}
            {error && <p>Er ging iets mis bij het ophalen van de data</p>}
            {pokemon &&
                <div className="pokemon-card">
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    <p>Moves: {pokemon.moves.length}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <p>Abilities:</p>
                    <ul>
                        {pokemon.abilities.map((oneAbility) => {
                            return <li key={oneAbility.ability.name}>{oneAbility.ability.name}</li>
                        })}
                    </ul>
                </div>
            }
        </section>
    )
}

export default Card;