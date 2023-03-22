import { Box } from 'Atoms/Box';
import { RowContainer } from './styles';

export const Row = ({rowIndex, rowColumns, getRowPosition}) => {
    
    function getBoxId(boxIndex) {
        getRowPosition(rowIndex, boxIndex)
    }

    return (
        <RowContainer data-testid="row">
            {rowColumns.map(
                (column, index) => 
                    <Box
                        key={index}
                        boxId={index}
                        boxState={column}
                        getBoxId={getBoxId}
                    />
                )
            }
        </RowContainer>
    )
}