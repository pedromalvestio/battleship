import Board from "../../../Atoms/Board"
import { usePlayer } from "../../../Context/Player/PlayerContext"
import { PlayerBoardContainer } from "./styles"

export const PlayerBoard = () => {
    const { board } = usePlayer()
    
    return (
        <PlayerBoardContainer>
            <Board board={board} />
        </PlayerBoardContainer>
    )
}