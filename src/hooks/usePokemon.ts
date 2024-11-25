import { useState } from "react"
import axios from "axios";
import { usePokemonReturn, usePokemonProps, ResponseApiType, listPokemonType, pokemonType, objResponseType } from "../context/typeResponseApi"

const url: string = "https://pokeapi.co/api/v2/";
const objResponse: objResponseType = {
    response: null,
    error: null
}

export default function usePokemon():usePokemonReturn {
    const [data, setData] = useState<objResponseType>(objResponse)

    async function getPokemon(pok: usePokemonProps) {
        const allUrl: string[] = getUrl(pok)
        const pokemons: objResponseType = await fetchPokemon(pok.type, allUrl)
        setData(pokemons)
    }
  
    return { pokemonDT: data, setPokemonDT: getPokemon }
}

function getUrl({ type, fetch }: usePokemonProps): string[] {
    let allRequests: string[] = []
    if (type == "pokemon") {
        allRequests = [
            `${url}pokemon/${fetch.pokemon}`,
            `${url}pokemon-species/${fetch.pokemon}`
        ]
    } {
        let start = fetch.listPokemon?.start;
        let end = fetch.listPokemon?.end;
        if (start && end) {
            for (let i = start; i < end; i++) {
                allRequests.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
            }
        }
    }
    return allRequests
}

async function fetchPokemon(type: string, requests: string[]): Promise<objResponseType> {
    let allResponses: ResponseApiType = []
    try {
        const allRequests = await Promise.all(requests.map(request => axios.get(request))) as any[]
        if (type == "pokemon") { 
            allResponses = dataPoke((allRequests.map(res => res.data) as pokemonType[]))
           
        } else {
            allResponses = dataListPoke((allRequests.map(res => res.data) as listPokemonType[]))
        }
        return {
            response: allResponses,
            error: null
        }
    }catch (error: any) {
        return {
            response: null,
            error: {
                status: error.status,
                message: error.message
            }
        }
    }
   
}

function dataPoke(response: pokemonType[]): pokemonType[] {
    const { height, weight, abilities, id, name, sprites, types, stats } = response[0]
    const { shape, generation } = response[1]

    return [{
        height,
        weight,
        abilities: (abilities[0] as any)['ability']['name'],
        id,
        name,
        sprites: (sprites as any)['other']['official-artwork']['front_default'],
        types,
        stats,
        shape: (shape as any)['name'],
        generation: (generation as any)['name']
    }]
}

function dataListPoke(response: listPokemonType[]): listPokemonType[] {
    let allResponses: listPokemonType[] = response.map(res => {
        const { id, name, sprites, types } = res
        return {
            name,
            types,
            sprites,
            id
        };
    })
    
    return allResponses
}
