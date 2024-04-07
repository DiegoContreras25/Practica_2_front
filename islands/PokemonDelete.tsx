import re from "https://esm.sh/v135/preact-render-to-string@6.3.1/X-ZS8q/denonext/preact-render-to-string.mjs";
import { FunctionComponent } from 'preact';
import { useState } from "preact/hooks";


// codigo para eliminar un pokemon introduciendo su creador

type ModalProps = {
    name: string,
}

const PokemonDelete: FunctionComponent<ModalProps> = (props) => {

    const { name } = props;

    const [creator, setCreator] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleDelete = async (e: Event) => {
        e.preventDefault();

        setError("");

        if (!creator) {
            setError("Creator is required!");
            return;
        }

        const res = await fetch(`/api/ByName/${name}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ creator: creator }),
        });

        const data = await res.json();

        if (res.status !== 200) {
            setError(data);
            return;
        }

        setError(data);
        setTimeout(() => {
            location.reload();
        }, 500);
    }

    return (
        <>
            <form class="DeletePokemon" onSubmit={handleDelete}>
                <h1 class="Titulo">Eliminar Pokemon {name}</h1>
                <label>
                    Creator:
                    <input
                        type="text"
                        value={creator}
                        onInput={(e) => setCreator((e.target as HTMLInputElement).value)}
                        autocomplete="off"
                    />
                </label>
                <button type="submit">Eliminar Pokemon</button>
                <p class="Error">{error}</p>
            </form>
        </>
    );

}
export default PokemonDelete;