import Axios from "npm:axios";
import { FreshContext, Handlers } from "$fresh/server.ts";

import { Pokemon } from "../../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown>) => {
    try {
      const { name } = ctx.params;

      const pokemon_request = await Axios.get<Pokemon[]>(
        `https://lospoquimones.deno.dev/${name}`,
      );

      if (pokemon_request.status !== 200) {
        throw new Error(`Error fetching pokemon data for ${name}`);
      }

      // Es necesario retornar el primer elemento del array de pokemon,
      // ya que la API devuelve un array con un solo elemento

      const pokemones: Pokemon[] = pokemon_request.data;

      return new Response(JSON.stringify(pokemones), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
      throw new Error(e);
    }
  },
  DELETE: async (req: Request, ctx: FreshContext) => {
    //curl -X DELETE -H "Content-Type: application/json" -d '{"creator":"Ash"}'

    try {
      const { name } = ctx.params;
      const body = await req.json();

      const response_fetch = await fetch(
        `https://lospoquimones.deno.dev/${name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        },
      );

      if (response_fetch.status === 404) {
        throw new Error(
          `Error deleting pokemon ${name} from creator ${body.creator}, not found`,
        );
      }

      if (response_fetch.status === 204) { // No Content status --> Lo que se espera (lo devuelve la API de los pokimones)
        return new Response(
          JSON.stringify(`Pokemon ${name} deleted successfully`),
          {
            headers: {
              "Content-Type": "application/json",
            },
            status: 200,
          },
        );
      }
    } catch (e) {
      console.error(e.message);
      return new Response(JSON.stringify(e.message), { status: 500 });
    }
  },
};
