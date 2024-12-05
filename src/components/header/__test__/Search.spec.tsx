import { fireEvent, render, screen } from "@testing-library/react"
import Search from "../Search"
import { usePokeContext } from "../../../context/pokeContext"

jest.mock("../../../context/pokeContext", () => ({
    usePokeContext: jest.fn()
}))

const mockUsePokeContext = usePokeContext as jest.MockedFunction<typeof usePokeContext>
const mockSetData = jest.fn()
describe("Search", () => {
    beforeEach(() => {
        mockUsePokeContext.mockReturnValue({ setData: mockSetData } as any)
    })
    afterEach(() => {
        jest.resetAllMocks()
    })
    it("testing whether Search is being rendered", () => {
        render(<Search />)
        expect(screen.getByPlaceholderText("search by name or id")).toBeInTheDocument()
    })

    it("testing whether setData is called when searching for any pokemon", () => {
        render(<Search />)
        const input = screen.getByPlaceholderText("search by name or id")
        fireEvent.change(input, {target: {value: "charmander"}})
        fireEvent.keyDown(input, { key: 'Enter'});
        expect(mockSetData).toHaveBeenCalledWith("charmander")
    })
})