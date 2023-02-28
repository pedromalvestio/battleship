import { Navigate, Route, Routes } from 'react-router-dom';
import Start from '../Pages/Start';
import Game from '../Pages/Game';
import GameResult from '../Pages/GameResult';
import ShipSelection from '../Pages/ShipSelection';
import { AppContainer } from './styles';
import { PlayerProvider } from '../Context/Player/PlayerContext';

export const App = () => {
  return (
    <PlayerProvider>
        <AppContainer>
          <Routes>
            <Route path='/' element={<Start />} />
            <Route path='/ship-selection' element={<ShipSelection />} />
            <Route path='/game' element={<Game />} />
            <Route path='/game-result' element={<GameResult />} />
            <Route path='*' element={<Navigate to={"/"} />} />
          </Routes>
        </AppContainer>
    </PlayerProvider>
  );
}