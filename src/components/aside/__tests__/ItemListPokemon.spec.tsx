import { fireEvent, render, screen } from "@testing-library/react"
import ItemListPokemon from "../ItemListPokemon"
import "@testing-library/jest-dom"
import { usePokeContext } from "../../../context/pokeContext"

jest.mock("../../../context/pokeContext.tsx", () => ({
    usePokeContext: jest.fn()
}))
jest.mock("../../main/LogoPokeball.tsx", () => () => { <div>Logo Pokemon</div> })
jest.mock("../../main/TypePokemon.tsx", () => ({ type }: { type: string }) => <div>{type}</div>)

const mockUsePokeContext = usePokeContext as jest.MockedFunction<typeof usePokeContext>;
function generateProps() {
    return {
        imgPoke: "charmander.png",
        namePoke: "charmander",
        typePoke: [{ type: { name: "fire" } }],
        idPoke: 4,
    }
}
describe("itemListPokemon", () => {
    beforeEach(() => {
        mockUsePokeContext.mockReturnValue({ data: { response: [{ id: 4 }] }, setData: jest.fn() } as any);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("testing whether the component appears on the screen", () => {
        const props = generateProps()
        render(<ItemListPokemon key={4} {...props} />)
        expect(screen.getByText("charmander")).toBeInTheDocument()
    })

    it("testing whether the context changes when the component is clicked", () => {
        const props = generateProps()
        const { setData } = usePokeContext()
        render(<ItemListPokemon key={4} {...props} />)
        const elemento = screen.getByText("charmander")
        fireEvent.click(elemento)
        expect(setData).toHaveBeenCalledWith("4")
    })
})