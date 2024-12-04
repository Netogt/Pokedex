import axios from "axios";
import { useFetchReturn, useFetchProps, ResponseApiType, listPokemonType, pokemonType, objResponseType } from "../interfaces"

const url: string = "https://pokeapi.co/api/v2/";
const maxPokemons: number = 1025

export default function useFetch():useFetchReturn {
    async function getPokemon(pok: useFetchProps): Promise<objResponseType> {
        const allUrl: string[] = getUrl(pok)
        const pokemons: objResponseType = await fetchPokemon(pok.type, allUrl)
        return pokemons
    }
    return {setPokemonDT: getPokemon }
}

function getUrl({ type, fetch }: useFetchProps): string[] {
    let allRequests: string[] = []
    if (type == "pokemon") {
        allRequests = [
            `${url}pokemon/${fetch.pokemon}`,
            `${url}pokemon-species/${fetch.pokemon}`
        ]
    } else {
        let start = fetch.listPokemon?.start;
        let end = fetch.listPokemon?.end != undefined && fetch.listPokemon?.end > maxPokemons ? maxPokemons + 1 : fetch.listPokemon?.end;
        if (start && end) {
            for (let i = start; i < end; i++) {
                allRequests.push(`https://pokeapi.co/api/v2/pokemon/${i}`)
            }
        }
    }
    return allRequests
}

async function fetchPokemon(type: string, requests: string[]): Promise<objResponseType> {
    try {
        let allResponses: ResponseApiType = []
        const allRequests = await Promise.all(requests.map(request => axios.get(request))) as any[]
        if (type == "pokemon") { 
            allResponses = dataPoke((allRequests.map(res => res.data) as pokemonType[]))
        } else {
            allResponses = dataListPoke((allRequests.map(res => res.data) as listPokemonType[]))
        }
        return {
            response: allResponses,
            error: null,
            maxPokemons
        }
    }catch (error: any) {
        return {
            response: null,
            error: {
                status: error.status,
                message: error.message
            },
            maxPokemons
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
