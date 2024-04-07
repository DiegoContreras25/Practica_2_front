import Axios from "npm:axios";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

import { Pokemon } from "../../types.ts";
import PokemonItem from "../../islands/PokemonItem.tsx";


export const handler: Handlers = {
    async GET(_req: Request, ctx: FreshContext<unknown, Pokemon>) {

        // Aquí llamo directamente a la API de los pokemones
        try {

            const { name } = ctx.params;

            const pokemon_request = await Axios.get<Pokemon[]>(`https://lospoquimones.deno.dev/${name}`,);

            if (pokemon_request.status !== 200) {
                throw new Error(`Error fetching pokemon data for ${name}`);
            }

            // Es necesario retornar el primer elemento del array de pokemon,ya que la API devuelve un array con un solo elemento

            const pokemon = pokemon_request.data[0];

            return ctx.render(pokemon);

        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    },
};

const Page = (props: PageProps<Pokemon>) => {
    const pokemon = props.data;

    try {
        return (
            <>
                <PokemonItem _id={pokemon._id} name={pokemon.name} image={pokemon.image} sound={pokemon.sound} />
            </>
        );
    } catch (e) {
        return (<>{e.message}</>);
    }
};

export default Page;