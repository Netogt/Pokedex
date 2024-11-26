import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { contextProps } from "./interfaces";
import usePokemon from "../hooks/usePokemon";

const context = createContext({} as contextProps);

export function ContainerContext({ children }: { children: ReactNode }) {
    const [pok, setPok] = useState()
    const {setPokemonDT } = usePokemon()
    function setData(pokemon: string | number): void {
        setPokemonDT({
            type: "pokemon",
            fetch: {
                pokemon: pokemon,
            }
        }).then(data=> {
            setPok(data)
            // console.log(data)
        })
        
    }

    useEffect(() => {
        setData(1)
    }, [])
    if(!pok) return
    return (
        <context.Provider value={{ data: pok, setData }}>
            {children}
        </context.Provider>
    )
}

export function usePokeContext() {
    return useContext(context);
}