import { render, screen } from "@testing-library/react"
import RequestError from "../RequestError"

describe("RequestError", () => {
    it("testing whether RequestError is being rendered", () => {
        render(<RequestError />)
        expect(screen.getByText("Ops...")).toBeInTheDocument()
        expect(screen.getByText("não foi possível encontrar")).toBeInTheDocument()
        expect(screen.getByText("tente novamente.")).toBeInTheDocument()
    })
})