import axios from "axios";
import {useEffect, useState} from "react";


function Card({name}) {
const [pokemon, setPokemon] = useState(null);

useEffect(() => {
    async function fetchPokemon() {
        try {
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
            console.log(result);
            setPokemon(result.data);
        } catch (e) {
            console.error(e);
        }
    }
    fetchPokemon();
},[] )

    return (
        <section>
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