import { BoxContainer } from "./styles"

export const Box = ({boxId, boxState, getBoxId}) => {
    
    function onClick() {
        getBoxId(boxId)
    }
    return <BoxContainer $state={boxState} onClick={onClick}/>
}