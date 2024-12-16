import { render, screen } from "@testing-library/react"
import MainSection from "../MainSection"

jest.mock("../MiddleSection", ()=> ()=> <div>middleSection</div>)
jest.mock("../LeftSection", ()=> ()=> <div>leftSection</div>)
jest.mock("../RightSection", ()=> ()=> <div>rightSection</div>)

describe("MainSection", () => {
    it("testing whether MainSection is being rendered", () => {
        render(<MainSection />)
        expect(screen.getByText("middleSection")).toBeInTheDocument()
        expect(screen.getByText("leftSection")).toBeInTheDocument()
        expect(screen.getByText("rightSection")).toBeInTheDocument()
    })
})