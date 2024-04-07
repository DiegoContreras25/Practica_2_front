import { FunctionComponent } from "preact";

import { Pokemon } from "../types.ts"
import { useState } from "preact/hooks";

import PokemonDelete from "./PokemonDelete.tsx";

const PokemonItem: FunctionComponent<Pokemon> = (props) => {
    const { _id, name, image, sound } = props;

    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const alternativeText = `Photo of the pokemon with id ${_id}`;
    const soundID = `SonidoPokemon ${_id}`;
    const vinculo = `/pokemon/${name}`;

    const PlaySound = () => {
        const sound = document.getElementById(soundID) as HTMLAudioElement;
        if (sound != null) sound.play();
    }

    // AGREGAR LO DEL MODAL PARA ELIMINAR

    const DeletePokemon = () => {
        setDeleteModal(true);
    }

    const CloseModal = () => {
        setDeleteModal(false);
    }

    return (
        <div class="PokemonItem">
            <a href={vinculo} class="NombrePokemon">{name}</a>
            <img src={image} class="ImagenPokemon" alt={alternativeText} />
            <button class="BotonSonido" onClick={PlaySound}>🔊</button>
            <audio id={soundID} src={sound} />
            <button class="BotonEliminar" onClick={DeletePokemon}>Eliminar</button>
            {deleteModal &&
                <div class="Modal">
                    <PokemonDelete name={name} />
                    <button class="close" onClick={CloseModal}>Cerrar</button>
                </div>
            }
        </div>
    );
}

export default PokemonItem;