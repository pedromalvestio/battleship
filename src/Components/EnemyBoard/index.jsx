import Board from "../../Atoms/Board"
import { BOX_STATE } from "../../Constants/Box"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { EnemyBoardContainer } from "./styles"

export const EnemyBoard = ({getBoardPostition}) => {
    const { enemyBoard } = usePlayer()

    function checkBoxStatus(rowIndex, boxIndex){
        if (enemyBoard[rowIndex][boxIndex] === BOX_STATE.EMPTY) {
            getBoardPostition(rowIndex, boxIndex)
        }
    }

    return (
        <EnemyBoardContainer>
            <h2>Your turn</h2>
            Shot enemy board
            <Board board={enemyBoard} getRowPosition={checkBoxStatus} />
        </EnemyBoardContainer>
    )
}