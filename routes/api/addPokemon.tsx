import Axios from "npm:axios";
import { Handlers } from "$fresh/server.ts";
import { Pokemon } from "../../types.ts";

export const handler: Handlers = {
    POST: async (req: Request) => {
        try {
            const { name, image, sound, creator } = await req.json();
            const pokemon = { name, image, sound, creator };
            const response = await Axios.post<Pokemon>("https://lospoquimones.deno.dev/", pokemon);

            return new Response(JSON.stringify(response.data), {
                headers: {
                    "Content-Type": "application/json",
                },
            });

        } catch (e) {
            console.error(e.response.data.message);
            return new Response(JSON.stringify(e.response.data.message), {
                status: 500,
            });
        }
    },
};