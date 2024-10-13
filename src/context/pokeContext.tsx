import axios from "axios";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import typeResponseApi from "./typeResponseApi";
interface contextProps {
    data: typeResponseApi,
    setData: (pokemon: string) => void
}

const context = createContext({} as contextProps);
const url: string = "https://pokeapi.co/api/v2/";

export function ContainerContext({ children }: { children: ReactNode }) {
    const [pokemonInfo, setPokemonInfo] = useState({} as typeResponseApi);

    function setData(pokemon: string | number): void {
        let requests = [`${url}pokemon/${pokemon}`, `${url}pokemon-species/${pokemon}`]
        Promise.all(requests.map(request => axios.get(request)))
            .then(response => {
                const {height, weight, abilities, id, name, sprites, types, stats} = response[0].data
                const {shape, generation} = response[1].data
                setPokemonInfo({
                    height, 
                    weight, 
                    abilities: abilities[0]['ability']['name'], 
                    id, 
                    name, 
                    sprites: sprites['other']['official-artwork']['front_default'], 
                    types, 
                    stats, 
                    shape: shape['name'], 
                    generation: generation['name']
                })
            })
            .catch(error => {
                if(error.status == 404) alert("não foi possivel encontrar esse pokemon")
            })
    }
    useEffect(() => {
        setData(1)
    }, [])
    return (
        <context.Provider value={{ data: pokemonInfo, setData }}>
            {children}
        </context.Provider>
    )
}

export function usePokeContext() {
    return useContext(context);
}