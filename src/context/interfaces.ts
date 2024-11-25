export type ResponseApiType = listPokemonType[] | pokemonType[];

interface types {
    type: type
}

interface type {
    name: string
}

interface stats {
    base_stat: number
}

export interface objResponseType{
    response: ResponseApiType | null,
    error: errorRequest | null
}

export interface pokemonType {
    height: number,
    weight: number,
    abilities: string,
    id: number,
    name: string,
    sprites: string,
    types: types[],
    stats: stats[],
    shape: string,
    generation: string
}

export interface listPokemonType {
    name: string,
    types: [],
    sprites: string,
    id: number
}

export interface errorRequest {
    status: number,
    message: string
}

export interface usePokemonProps {
    type: string,
    fetch: {
        pokemon?: string | number,
        listPokemon?: {
            start: number,
            end: number
        }
    }
}
export interface usePokemonReturn {
    pokemonDT: objResponseType,
    setPokemonDT: (pok: usePokemonProps) => void
}

export interface contextProps {
    data: objResponseType,
    setData: (pokemon: string) => void
}