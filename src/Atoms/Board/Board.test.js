import { fireEvent, render, screen, within } from "@testing-library/react";
import Board from ".";
import { BOARD_SIZE, emptyBoard } from "../../Constants/Board"

describe("Check board structure", () => {
    it("Board with the expected rows and box size", () => {
        render(<Board board={emptyBoard} />)
        const rows = screen.getAllByTestId("row")
        expect(rows.length).toEqual(BOARD_SIZE) 
        const box = within(screen.getAllByTestId('row')[0]).getAllByTestId("box")
        expect(box.length).toEqual(BOARD_SIZE) 
    })
    it("Board without the expected rows and box size", () => {
        render(<Board board={emptyBoard} />)
        const rows = screen.getAllByTestId("row")
        expect(rows.length).not.toEqual(BOARD_SIZE+1) 
        const box = within(screen.getAllByTestId("row")[0]).getAllByTestId("box")
        expect(box.length).not.toEqual(BOARD_SIZE+1) 
    })
})

describe.each([0,1,2,3])("Get board position", (id) => {
    let rowId = null
    let boxId = null
    function getBoardData(row, box) {
        rowId = row;
        boxId = box;
    }
    it(`get ${id} for rowId and boxId ${id}`, () => {
        render(<Board board={emptyBoard} getRowPosition={getBoardData} />)
        const box = within(screen.getAllByTestId('row')[id]).getAllByTestId("box")[id]
        fireEvent.click(box)
        expect(rowId).toEqual(id) 
        expect(boxId).toEqual(id) 
    })
    it(`don't get ${id} for rowId and boxId ${id}`, () => {
        render(<Board board={emptyBoard} getRowPosition={getBoardData} />)
        const box = within(screen.getAllByTestId('row')[id]).getAllByTestId("box")[id]
        fireEvent.click(box)
        expect(rowId).not.toEqual(id+1) 
        expect(boxId).not.toEqual(id+1) 
    })
})