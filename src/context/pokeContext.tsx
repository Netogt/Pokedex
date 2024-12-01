import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { contextProps, objResponseType } from "./interfaces";
import useFetch from "../hooks/useFetch";

const context = createContext({} as contextProps);

export function ContainerContext({ children }: { children: ReactNode }) {
    const [objResponse, setObjResponse] = useState<objResponseType>()
    const {setPokemonDT } = useFetch()
    
    function setData(pokemon: string | number): void {
        setPokemonDT({
            type: "pokemon",
            fetch: {
                pokemon: pokemon,
            }
        }).then(data=> {
            setObjResponse(data)
        })
        
    }

    useEffect(() => {
        setData(1)
    }, [])
    if(!objResponse) return
    return (
        <context.Provider value={{ data: objResponse, setData }}>
            {children}
        </context.Provider>
    )
}

export function usePokeContext() {
    return useContext(context);
}