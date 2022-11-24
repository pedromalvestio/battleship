import { Row } from '../Row';

const Board = ({board, getRowPosition}) => {
    
    return (board.map(
        (row, index) => 
            <Row
                key={index} 
                rowIndex={index}
                rowColumns={row}
                getRowPosition={getRowPosition}
            />
    ))
}

export default Board;