import axios from "axios";
import {
    useFetchReturn,
    ResponseApiType,
    listPokemonType,
    pokemonType,
    objResponseType,
    getUrlType,
    fetchPokemonType,
    dataPokeType,
    dataListPokeType,
    getPokemonType
} from "../interfaces"

const baseUrl: string = "https://pokeapi.co/api/v2/";
const maxPokemons: number = 1025
export default function useFetch(): useFetchReturn {
    const getPokemon: getPokemonType = async (pok, callBackGetUrl = getUrl, callBackFetchPokemon = fetchPokemon) => {
        const allUrl: string[] = callBackGetUrl(pok, baseUrl)
        const pokemons: objResponseType = await callBackFetchPokemon(pok.type, allUrl, dataPoke, dataListPoke)
        return pokemons
    }
    return { setPokemonDT: getPokemon }
}

export const getUrl: getUrlType = ({ type, fetch }, url) => {
    let allRequests: string[] = []
    if (type == "pokemon") {
        allRequests = [
            `${url}pokemon/${fetch.pokemon}`,
            `${url}pokemon-species/${fetch.pokemon}`
        ]
    } else {
        let start = fetch.listPokemon?.start;
        let end = fetch.listPokemon?.end != undefined &&
            fetch.listPokemon?.end > maxPokemons ? maxPokemons : fetch.listPokemon?.end;
        if (start && end) {
            for (let i = start; i <= end; i++) {
                allRequests.push(`${url}pokemon/${i}`)
            }
        }
    }
    return allRequests
}

export const fetchPokemon: fetchPokemonType = async (type, requests, callBackDataPoke, callBackDataListPoke) => {
    try {
        let allResponses: ResponseApiType = []
        const allRequests = await Promise.all(requests.map(request => axios.get(request)))
        if (type == "pokemon") {
            allResponses = callBackDataPoke(allRequests.map(res => res.data))
        } else {
            allResponses = callBackDataListPoke(allRequests.map(res => res.data))
        }
        return {
            response: allResponses,
            error: null,
            maxPokemons
        }
    } catch (error: any) {
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

export const dataPoke: dataPokeType = (response) => {
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

export const dataListPoke: dataListPokeType = (response) => {
    let allResponses: listPokemonType[] = response.map(res => {
        const { id, name, sprites, types } = res
        return {
            name,
            types,
            sprites: (sprites as any)['other']['official-artwork']['front_default'],
            id
        };
    })
    return allResponses
}
