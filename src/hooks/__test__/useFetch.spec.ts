import useFetch, { dataPoke, dataListPoke } from "../useFetch";

const mockGetUrl = jest.fn().mockReturnValue(["http://url1", "http://url2"])
const mockFetchPokemon = jest.fn().mockResolvedValue({name: "charmander", id: 4})

describe("useFetch", () => {
    afterAll(() => {
        jest.clearAllMocks()
    })
    it("testing whether useFetch returns an object with setData", async () => {
        const { setPokemonDT } = useFetch()
        const objSetPokemonDT = {
            type: "pokemon",
            fetch: {
                pokemon: 1,
            }
        }
        const response = await setPokemonDT(objSetPokemonDT, mockGetUrl, mockFetchPokemon)

        expect(response).toEqual({name: "charmander", id: 4})
        expect(mockGetUrl).toHaveBeenCalledWith(objSetPokemonDT, "https://pokeapi.co/api/v2/")
        expect(mockFetchPokemon).toHaveBeenCalledWith(objSetPokemonDT.type, ["http://url1", "http://url2"], dataPoke, dataListPoke )
    })
})