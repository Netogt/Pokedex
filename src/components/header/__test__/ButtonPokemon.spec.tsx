import { fireEvent, render, screen } from "@testing-library/react"
import ButtonPokemon from "../ButtonPokemon"
import { usePokeContext } from "../../../context/pokeContext"

const mockSetData = jest.fn()
jest.mock("../../../context/pokeContext", () => ({
    usePokeContext: jest.fn()
}))
const mockUsePokeContext = usePokeContext as jest.MockedFunction<typeof usePokeContext>;
describe("ButtonPokemon", () => {
    beforeEach(() => {
        mockUsePokeContext.mockReturnValue({
            data: { response: [{ id: 1 }] },
            setData: mockSetData
        } as any);
    })

    it("testing if the left button is rendering", () => {
        render(<ButtonPokemon svgStyle={{ transform: "rotate(180deg)" }} button="previous" />)
        expect(screen.getByTestId("previous"))
    })

    it("testing whether the setData function is called when the left button is clicked", () => {
        render(<ButtonPokemon svgStyle={{ transform: "rotate(180deg)" }} button="previous" />)
        const button = screen.getByTestId("previous")
        fireEvent.click(button)
        expect(mockSetData).toHaveBeenCalledWith("1025")
    })

    it("testing if the right button is rendering", () => {
        render(<ButtonPokemon button="next" />)
        expect(screen.getByTestId("next"))
    })

    it("testing whether the setData function is called when the right button is clicked", () => {
        render(<ButtonPokemon button="next" />)
        const button = screen.getByTestId("next")
        fireEvent.click(button)
        expect(mockSetData).toHaveBeenCalledWith("2")
    })
})