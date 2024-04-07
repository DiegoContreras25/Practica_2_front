import { FreshContext } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Menu from "../components/Menu.tsx";

// Es asíncrono el layout para poder acceder a la solicitud y al contexto

const Layout = async (req: Request, ctx: FreshContext) => {
    const Component = ctx.Component;
    const route = ctx.route;
    // last after /
    const page = route.split("/").pop();
    // if page is empty, it means we are at the root
    const selected = page === "" ? "List" : page.charAt(0).toUpperCase() + page.slice(1); // pone en mmayuscula la primera letra del nombre de la página

    return (
        <>
            <Menu selected={selected as "List" | "Search" | "Add"} />
            <Component />
            <Footer />
        </>
    );
};

export default Layout;