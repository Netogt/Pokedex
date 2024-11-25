import { createContext, useContext, ReactNode, useEffect } from "react";
import { contextProps, pokemonType } from "./interfaces";
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

    if (pokemonDT.response == null) {
        if (pokemonDT.error != null) {
            return (
                <div style={{
                    width: "100%",
                    height: "90vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}>
                    <h2 style={{fontSize: "4.5rem"}}>{pokemonDT.error.status}</h2>
                    <h2>{pokemonDT.error.message}</h2>
                </div>
            )
        }
        return
    }
    return (
        <context.Provider value={{ data: (pokemonDT.response[0] as pokemonType), setData }}>
            {children}
        </context.Provider>
    )
}

export function usePokeContext() {
    return useContext(context);
}