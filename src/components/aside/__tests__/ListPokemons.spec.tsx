import { act, render, screen} from "@testing-library/react"
import ListPokemons from "../ListPokemons"

type callBackIBType = (args?: { isIntersecting: boolean }[]) => void
class IntersectionObserverMock {
    private callBack: callBackIBType
    private ElementObserver: HTMLElement[] = []
    private IntersectionObserverMockProps: { isIntersecting: boolean }[] = [{ isIntersecting: true }]

    constructor(callBack: callBackIBType) {
        this.callBack = callBack
    }

    public observe(element: HTMLElement): void {
        this.ElementObserver.push(element)
        this.callBack(this.IntersectionObserverMockProps)
    }

    public disconnect(): void {
        this.ElementObserver.length = 0
    }
}
window.IntersectionObserver = IntersectionObserverMock as any

const mockSetPokemonDT = jest.fn()
jest.mock("../ItemListPokemon", () => ({namePoke}: any) => <div>{namePoke}</div>)
jest.mock("../../../hooks/useFetch", () => () => ({
    setPokemonDT: mockSetPokemonDT.mockResolvedValue({
        response: [{
            name: "charmander",
            types: [{ type: { name: "fire" } }],
            sprites: { other: { 'official-artwork': { front_default: "charmander.png" } } },
            id: 4
        }],
        maxPokemons: 1
    })
}))

describe("ListPokemons", () => {
    it("testing whether ListPokemons is being rendered", async () => {
        await act(async () => { 
            render(<ListPokemons />);
        })
        expect(screen.getByText("charmander")).toBeInTheDocument()
    })

    it("testing whether setPokemonDT is being called", async () => {
        await act(async () => {
            render(<ListPokemons />)
        })
        expect(mockSetPokemonDT).toHaveBeenCalled()
    })
})