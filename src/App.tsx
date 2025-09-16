import React from 'react';
import { useSelector } from 'react-redux';
import Board from './components/Board.tsx';
import RollTheDice from './components/RollTheDice.tsx';
import { Reset } from './components/icons';
import { resetGame } from './services/SequencerService.ts';
import { selectIsNewGame } from './store/gameSlice.ts';
import './App.css';

export default function App(): React.ReactElement {
    const isNewGame = useSelector(selectIsNewGame);

    return (
        <main>
            <div className="main-container">
                <div className="header-container">
                    <h1>Ludas</h1>

                    <div className="header-buttons">
                        {!isNewGame && (
                            <div className="header-button" onClick={() => resetGame()}>
                                <Reset />
                            </div>
                        )}
                    </div>
                </div>

                <Board />

                <RollTheDice />
            </div>
        </main>
    );
}
