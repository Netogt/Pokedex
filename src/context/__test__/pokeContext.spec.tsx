import { fireEvent, render, screen } from "@testing-library/react"
import { usePokeContext } from "../pokeContext"
import { act } from "react"
import ContainerContext from "../pokeContext"

const mockSetPokemonDT = jest.fn()
jest.mock("../../hooks/useFetch", () => () => ({
    setPokemonDT: mockSetPokemonDT
}))

function ComponentTest() {
    const { data, setData } = usePokeContext()

    if (data.response)
        return (
            <div onClick={() => setData("10")}>
                {data.response[0].name}
            </div>
        )
}

describe("pokeContext", () => {
    beforeEach(async () => {
        mockSetPokemonDT.mockResolvedValue({
            response: [{
                height: 60,
                weight: 85,
                abilities: "blaze",
                id: 4,
                name: "charmander",
                sprites: "charmander.png",
                types: "fire",
                stats: null,
                shape: "upright",
                generation: "generation I"
            }],
            error: null,
            maxPokemons: 1
        })

        await act(async () => {
            render(
                <ContainerContext>
                    <ComponentTest />
                </ContainerContext>
            )
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it("testing whether the setData function is being called when the context is initialized", () => {
        expect(mockSetPokemonDT).toHaveBeenCalledTimes(1)
    })

    it("testing whether some value is returned when the context is initialized", () => {
        expect(screen.getByText("charmander")).toBeInTheDocument()
    })

    it("testing whether when setData is executed, a new request is made with the defined value", () => {
        fireEvent.click(screen.getByText("charmander"))
        expect(mockSetPokemonDT).toHaveBeenCalledWith({ fetch: { pokemon: "10" }, type: "pokemon" })
    })
})