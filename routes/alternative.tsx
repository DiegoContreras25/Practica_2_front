import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import PokemonesList_Alt from "../components/PokemonesList_Alt.tsx";
import { Pokemon } from "../types.ts";

export const handler: Handlers = {
    GET: async (_: unknown, ctx: FreshContext<unknown, Pokemon[]>) => {
        const pokemon_request = await Axios.get<Pokemon[]>(`https://lospoquimones.deno.dev/`,);

        if (pokemon_request.status !== 200) {
            throw new Error(`Error fetching pokemon data from API`);
        }

        const pokemones: Pokemon[] = pokemon_request.data;

        return ctx.render(pokemones);
    }
}

const Page = (props: PageProps<Pokemon[]>) => {

    const pokemones = props.data;

    return (
        <>
            <h1 class="Titulo">Pokemones</h1>
            <PokemonesList_Alt pokemones={pokemones} />
        </>
    );
};

export default Page;