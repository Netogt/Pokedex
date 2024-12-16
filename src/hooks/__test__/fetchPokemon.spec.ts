import { fetchPokemon } from "../useFetch";
import axios from "axios";

jest.mock("axios")
const mockDataPoke = jest.fn().mockImplementation(res => [{ ...res }])
const mockDataListPoke = jest.fn().mockImplementation(res => res.map((data: any) => ({ ...data })))

describe("fetchPokemon", () => {
    it("testing the return of the function if the type argument is pokemon", async () => {
        axios.get = jest.fn().mockImplementation((urls: string) => Promise.resolve({ data: { name: "charmander", id: urls.slice(34) } }))
        const urls = ["https://pokeapi.co/api/v2/pokemon/1"]
        const response = await fetchPokemon("pokemon", urls, mockDataPoke, mockDataListPoke)

        expect(response).toEqual({
            response: [{ '0': { name: 'charmander', id: '1' } }],
            error: null,
            maxPokemons: 1025
        })
    })

    it("testing the return of the function if the type argument is list", async () => {
        axios.get = jest.fn().mockImplementation((urls: string) => Promise.resolve({ data: { name: "charmander", id: urls.slice(34) } }))
        const urls = ["https://pokeapi.co/api/v2/pokemon/1", "https://pokeapi.co/api/v2/pokemon/2"]
        const response = await fetchPokemon("type", urls, mockDataPoke, mockDataListPoke)
  
        expect(response).toEqual({
            response: [{ name: 'charmander', id: '1' }, { name: 'charmander', id: '2' }],
            error: null,
            maxPokemons: 1025
        })
    })

    it("testing the return of the function if the request fails", async () => {
        axios.get = jest.fn().mockImplementation(() => Promise.reject({status: 404, message: "Request failed with status code 404"}))
        const urls = ["https://pokeapi.co/api/v2/pokemon/1"]
        const response = await fetchPokemon("pokemon", urls, mockDataPoke, mockDataListPoke)
   
        expect(response).toEqual({
            response: null,
            error: {
                status: 404,
                message: "Request failed with status code 404"
            },
            maxPokemons: 1025
        })
    })
})