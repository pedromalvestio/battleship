import Board from "../../Atoms/Board"
import { usePlayer } from "../../Context/Player/PlayerContext"
import { PlayerBoardContainer } from "./styles"

export const PlayerBoard = ({getBoardPostition}) => {
    const { board } = usePlayer()
    
    return (
        <PlayerBoardContainer>
            <h2>Enemy turn:</h2>
            Wait for enemy shot
            <Board board={board} getRowPosition={getBoardPostition} />
        </PlayerBoardContainer>
    )
}