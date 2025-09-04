import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AI, Human, Play} from "./icons";
import {nextMove} from "../services/SequencerService.ts";
import {startGame} from "../store/gameSlice.ts";
import type {Player} from "../models";
import "./NewGameOverlay.css";

type PlayerType = 'AI' | 'Human' | null;

export default function NewGameOverlay(): React.ReactElement {
    const dispatch = useDispatch();
    const [newPlayers, setNewPlayers] = useState<Player[]>([
        {color: "orange", type: 'Human'},
        {color: "purple", type: null},
        {color: "green", type: 'AI'},
        {color: "blue", type: null}
    ]);

    function changePlayerIdentity(playerIndex: number, type: PlayerType) {
        setNewPlayers([...newPlayers].map((player, index) => {
            if (playerIndex === index) {
                return {...player, type: type};
            } else {
                return player;
            }
        }));
    }

    function onPlayButtonPressed() {
        setTimeout(() => {
            dispatch(startGame(newPlayers));
            nextMove();
        }, 100);
    }

    return (
        <div className="new-game-overlay">
            <div className="horizontal-new-players">
                <PlayerIdentitySelector
                    player={newPlayers[1]}
                    playerPos={1}
                    onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(1, type)}
                />

                <span className="horizontal-gap" />

                <PlayerIdentitySelector
                    player={newPlayers[2]}
                    playerPos={2}
                    onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(2, type)}
                />
            </div>

            <div className="centered-area">
                <div className="play-button" onClick={onPlayButtonPressed}>
                    <span className="play-button-edge" />
                    <div className="play-button-front">
                        <Play color="var(--default)" />
                    </div>
                </div>
            </div>

            <div className="horizontal-new-players">
                <PlayerIdentitySelector
                    player={newPlayers[0]}
                    playerPos={0}
                    onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(0, type)}
                />

                <span className="horizontal-gap" />

                <PlayerIdentitySelector
                    player={newPlayers[3]}
                    playerPos={3}
                    onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(3, type)}
                />
            </div>
        </div>
    );
}


interface PlayerIdentitySelectorProps {
    player: Player;
    playerPos: number;
    onChangePlayerIdentity: (type: PlayerType) => void;
}

function PlayerIdentitySelector({player, playerPos, onChangePlayerIdentity}: PlayerIdentitySelectorProps): React.ReactElement {
    const isHuman = player.type === "Human";
    const isAI = player.type === "AI";

    return (
        <div className="new-player-container">
            <div className="player-identity">
                <div
                    className={`identity-button ${isHuman ? "identity-button-pressed": ""}`}
                    onClick={() => onChangePlayerIdentity(isHuman ? null : "Human")}
                >
                    <span className="identity-button-edge" />
                    <div className="identity-button-front">
                        <Human color={isHuman ? player.color : "var(--black)"} />
                    </div>
                </div>
                <div
                    className={`identity-button ${isAI ? "identity-button-pressed": ""}`}
                    onClick={() => onChangePlayerIdentity(isAI ? null : "AI")}
                >
                    <span className="identity-button-edge" />
                    <div className="identity-button-front">
                        <AI color={isAI ? player.color : "var(--black)"} />
                    </div>
                </div>
            </div>

            <p className="new-player-name">Joueur {playerPos + 1}</p>
        </div>
    );
}