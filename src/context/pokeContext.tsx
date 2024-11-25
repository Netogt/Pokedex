import { createContext, useContext, ReactNode, useEffect } from "react";
import { contextProps } from "./interfaces";
import usePokemon from "../hooks/usePokemon";

const context = createContext({} as contextProps);

export function ContainerContext({ children }: { children: ReactNode }) {
    const { pokemonDT, setPokemonDT } = usePokemon()
    function setData(pokemon: string | number): void {
        setPokemonDT({
            type: "pokemon",
            fetch: {
                pokemon: pokemon,
            }
        })
    }

    useEffect(() => {
        setData(1)
    }, [])

    return (
        <context.Provider value={{ data: pokemonDT, setData }}>
            {children}
        </context.Provider>
    )
}

export function usePokeContext() {
    return useContext(context);
}