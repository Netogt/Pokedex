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

export interface useFetchProps {
    type: string,
    fetch: {
        pokemon?: string | number,
        listPokemon?: {
            start: number,
            end: number
        }
    }
}
export interface useFetchReturn {
    // pokemonDT: objResponseType,
    setPokemonDT: (pok: useFetchProps) => Promise<objResponseType>
}

export interface contextProps {
    data: objResponseType,
    setData: (pokemon: string) => void
}

interface namePokTp {
    name: string
}
interface typePokTp {
    type: namePokTp
}
export interface ItemListPokemonProps {
    imgPoke: string,
    namePoke: string,
    typePoke: typePokTp[],
    idPoke: number,
}