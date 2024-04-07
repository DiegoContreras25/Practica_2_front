import { FunctionComponent } from "preact";
import { useState } from "preact/hooks";
import Axios from "npm:axios";

import { Pokemon } from "../types.ts"
import PokemonItem from "./PokemonItem.tsx";

const PokemonSearch: FunctionComponent = () => {

    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [pokemones, setPokemones] = useState<Pokemon[] | null>(null);

    const handleSearch = async (e: Event) => {
        e.preventDefault();

        const response = await fetch(`/api/ByName/${name}`);

        const pokemones_data: Pokemon[] = await response.json();

        if (pokemones_data.length === 0) {
            setError("No pokemon found");
            setPokemones(null);
            return;
        }

        setPokemones(pokemones_data);

    };

    return (
        <>
            <h1 class="Titulo">Buscar Pokemon</h1>
            <div class="PokemonSearch">
                <label for="PokemonSearch">Pokemon name:</label>
                <input type="text" id="PokemonSearch" name="PokemonSearch"
                    onInput={(e) => setName(e.currentTarget.value)}
                    onFocus={() => setError("")}
                />

                <button onClick={handleSearch}>Search</button>
                {error && <p class="Error">{error}</p>}
                {pokemones &&
                    <div className="PokemonesList">
                        {pokemones.map((pokemon: Pokemon) => (
                            <PokemonItem
                                key={pokemon._id} // Importante: se debe agregar una key única para cada elemento de la lista
                                _id={pokemon._id}
                                name={pokemon.name}
                                image={pokemon.image}
                                sound={pokemon.sound}
                            />
                        ))}
                    </div>}
            </div>
        </>

    );
}

export default PokemonSearch;