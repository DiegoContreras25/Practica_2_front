import { FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Pokemon } from "../types.ts";
import PokemonItem from "./PokemonItem.tsx";

const PokemonesList: FunctionComponent = () => {
    const [pokemones, setPokemones] = useState<Pokemon[] | null>(null); // Variable de estado para almacenar los pokemones en un array
    const [loading, setLoading] = useState<boolean>(true); // Variable de estado para indicar si se está cargando la información o no

    useEffect(() => {                           

        const fetchPokemones = async () => {    // Función asíncrona para obtener los pokemones de la API(siempre que hablamos con una API lo hacemos de manera asincrona)
            try {
                const fetch_pokemones = await fetch("/api/getAllPokemon");
                const pokemones_data: Pokemon[] = await fetch_pokemones.json();
                setPokemones(pokemones_data);
                setLoading(false); // Ponemos loading en false para indicar que ya se cargó la información anteriormente
            } catch (error) {
                console.error(error);
                throw new Error(error);
            }
        };

        fetchPokemones(); // En el useEffect llamamos a la función fetchPokemones (durante el montaje del componente)
    }, []); // El segundo argumento de useEffect es un array vacío, lo que significa que solo se ejecutará una vez

    return (
        <div className="PokemonesList">
            {loading ? (
                <p>Loading...</p>
            ) : (
                pokemones &&
                pokemones.map((pokemon: Pokemon) => (
                    <PokemonItem
                        key={pokemon._id} // Importante: se debe agregar una key única para cada elemento de la lista
                        _id={pokemon._id}
                        name={pokemon.name}
                        image={pokemon.image}
                        sound={pokemon.sound}
                    />
                ))
            )}
        </div>
    );
};

export default PokemonesList;