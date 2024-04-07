import { FunctionComponent } from "preact";

type MenuProps = {
    selected: "List" | "Search" | "Add";
};

const Menu: FunctionComponent<MenuProps> = ({ selected }) => {
    return (
        <div class="menu">
            <a href="/" class={selected === "List" ? "selected" : ""}>
                Lista de los Pokemons
            </a>         
            <a href="/add" class={selected === "Add" ? "selected" : ""}>
                Añadir un Pokemon
            </a>
            <a href="/search" class={selected === "Search" ? "selected" : ""}>
                Buscar los Pokemons
            </a>
        </div>
    );
};

export default Menu;