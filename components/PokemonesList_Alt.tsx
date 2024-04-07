import { FunctionComponent } from "preact";
import { Pokemon } from "../types.ts";
import PokemonItem from "../islands/PokemonItem.tsx";

type PokemonesList_AltProps = {
    pokemones: Pokemon[];
};

// Ejemplo de component 

const PokemonesList_Alt: FunctionComponent<PokemonesList_AltProps> = (props) => {

    const { pokemones } = props;

    return (
        <div className="PokemonesList">
            {
                pokemones.map((pokemon: Pokemon) => (
                    <PokemonItem
                        key={pokemon._id} //agregar una key única para cada elemento de la lista
                        _id={pokemon._id}
                        name={pokemon.name}
                        image={pokemon.image}
                        sound={pokemon.sound}
                    />
                ))
            }
        </div>
    );
};

export default PokemonesList_Alt;