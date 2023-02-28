import { fireEvent, render, screen } from "@testing-library/react";
import { Row } from ".";
import { BOARD_SIZE, emptyRow } from "../../Constants/Board";

describe.each([0, 1])("getRowAndBoxId return", (id) => {
    let rowId = null
    let boxId = null
    function getRowData(row, box) {
        rowId = row;
        boxId = box;
    }
    it(`get ${id} for rowId and boxId ${id}`, () => {
        render(<Row rowIndex={id} rowColumns={emptyRow} getRowPosition={getRowData}/>)
        const box = screen.getAllByTestId("box")[id]
        fireEvent.click(box)
        expect(rowId).toEqual(id) 
        expect(boxId).toEqual(id) 
    })
    it(`don't get ${id} for rowId and boxId ${id+1}`, () => {
        render(<Row rowIndex={id+1} rowColumns={emptyRow} getRowPosition={getRowData}/>)
        const box = screen.getAllByTestId("box")[id+1]
        fireEvent.click(box)
        expect(rowId).not.toEqual(id)
        expect(boxId).not.toEqual(id)
    })
})
describe("Check row structure", () => {
    it("Row with the expected board size", () => {
        render(<Row rowIndex={0} rowColumns={emptyRow} />)
        const boxes = screen.getAllByTestId("box")
        expect(boxes.length).toEqual(BOARD_SIZE) 
    })
    it("Row without the expected board size", () => {
        render(<Row rowIndex={0} rowColumns={emptyRow} />)
        const boxes = screen.getAllByTestId("box")
        expect(boxes.length).not.toEqual(BOARD_SIZE+1) 
    })
})