export type ResponseApiType = listPokemonType[] | pokemonType[];

interface types {
    type: type
}

interface type {
    name: string
}

export type getUrlType = (props: useFetchProps, url: string) => string[]

export type fetchPokemonType = (
    type: string,
    requests: string[],
    callBackDataPoke: dataPokeType,
    callBackDataListPoke: dataListPokeType
) => Promise<objResponseType>

export type dataPokeType = (response: pokemonType[]) => pokemonType[]

export type dataListPokeType = (response: listPokemonType[]) => listPokemonType[]

export type getPokemonType = (
    pok: useFetchProps, 
    callBackGetUrl?: getUrlType, 
    callBackFetchPokemon?: fetchPokemonType
) => Promise<objResponseType>

interface stats {
    base_stat: number
}

export interface ButtonPokemonProps {
    svgStyle?: {
        [key: string]: string,
    },
    button: string
}

export interface PokemonInfoProps {
    infoTitle: string,
    infoValue: number | string
}

export interface objResponseType {
    response: ResponseApiType | null,
    error: errorRequest | null,
    maxPokemons: number
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
    setPokemonDT: getPokemonType
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