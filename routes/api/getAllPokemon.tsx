import Axios from "npm:axios";
import { Handlers } from "$fresh/server.ts";
import { Pokemon } from "../../types.ts";

export const handler: Handlers = {
    GET: async () => {

        try {
            const pokemon_request = await Axios.get<Pokemon[]>(`https://lospoquimones.deno.dev/`,);

            if (pokemon_request.status !== 200) {
                throw new Error(`Error fetching pokemon data from API`);
            }

            const pokemones: Pokemon[] = pokemon_request.data;

            return new Response(JSON.stringify(pokemones), {
                headers: {
                    "Content-Type": "application/json"
                }
            })

        } catch (e) {
            console.error(e);
            throw new Error(e);
        }
    },
};