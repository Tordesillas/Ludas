import React from "react";
import Board from "./components/Board.tsx";
import RollTheDice from "./components/RollTheDice.tsx";
import {Reset} from "./components/icons";
import {resetGame} from "./services/SequencerService.ts";
import './App.css';

export default function App(): React.ReactElement {
    return (
        <main>
            <div className="main-container">
                <div className="header-container">
                    <h1>Ludas</h1>
                    <div className="header-buttons">
                        <div className="header-button" onClick={() => resetGame()}>
                            <Reset />
                        </div>
                    </div>
                </div>

                <Board />

                <RollTheDice />
            </div>
        </main>
    );
}