import { fetchPokemon } from "../useFetch";
import axios from "axios";

jest.mock("axios")

describe("fetchPokemon", () => {
    it("testing the return of the function if the type argument is pokemon", async () => {
        // axios.get = jest.fn().mockResolvedValue({data: {name: "charmander", id: 1}})
        axios.get = jest.fn().mockImplementation((urls: string) =>  Promise.resolve({data: {name: "charmander", id: urls.slice(34)}}))

        const urls = ["https://pokeapi.co/api/v2/pokemon/1"]
        const response = await fetchPokemon("pokemon", urls)
        console.log(response)
    })
})