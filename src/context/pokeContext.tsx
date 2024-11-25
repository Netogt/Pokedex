import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { contextProps, pokemonType } from "./typeResponseApi";
import usePokemon from "../hooks/usePokemon";

const context = createContext({} as contextProps);
const url: string = "https://pokeapi.co/api/v2/";

export function ContainerContext({ children }: { children: ReactNode }) {
    const {pokemonDT, setPokemonDT } = usePokemon()
    function setData(pokemon: string | number): void {
        setPokemonDT({
            type: "pokemon",
            fetch: {
                pokemon: pokemon,
            }
        })
        
        
    }
    
    // console.log(pokemonDT)
    useEffect(() => {
        setData(1)
    }, [])
    if(pokemonDT.response == null){
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