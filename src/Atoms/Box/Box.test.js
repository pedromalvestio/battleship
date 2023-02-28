import { fireEvent, render, screen } from "@testing-library/react"
import { Box } from "."
import { BOX_STATE } from "../../Constants/Box"

describe.each([0, 1])("getBoxId return", (id) => {
    let boxId = null
    function getId(box) {
        boxId = box;
    }
    it(`get ${id} for boxId ${id}`, () => {
        render(<Box boxId={id} getBoxId={getId}/>)
        const box = screen.getByTestId("box")
        fireEvent.click(box)
        expect(boxId).toEqual(id) 
    })
    it(`don't get ${id} for boxId ${id+1}`, () => {
        render(<Box boxId={id+1} getBoxId={getId}/>)
        const box = screen.getByTestId("box")
        fireEvent.click(box)
        expect(boxId).not.toEqual(id)
    })
})

describe.each([
    [null, 'mediumblue'],
    [BOX_STATE.EMPTY, 'mediumblue'],
    [BOX_STATE.MISS, 'transparent'],
    [BOX_STATE.HIT, 'orangered'],
    [BOX_STATE.SINK, 'darkred'],
    [BOX_STATE.SHIP, 'dimgrey'],
])("Check box color by boxState", (state, expected) => {
    it(`For ${state} is expected ${expected}`, () => {
        render(<Box boxState={state} />)
        const box = screen.getByTestId("box")
        const boxStyle = window.getComputedStyle(box)
        expect(boxStyle['background-color']).toBe(expected) 
    })
})