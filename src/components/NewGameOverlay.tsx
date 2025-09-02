import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AI, Empty, Human, Play} from "./icons";
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
    const playerTypes: PlayerType[] = ["Human", "AI", null];

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
                <div className="new-player-container">
                    <div className="player-identity">
                        {playerTypes.map((type) =>
                            <PlayerIdentityButton
                                key={`${type}-p2`}
                                type={type}
                                player={newPlayers[1]}
                                onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(1, type)}
                            />
                        )}
                    </div>

                    <p className="new-player-name">Joueur 2</p>
                </div>

                <span className="horizontal-gap"/>

                <div className="new-player-container">
                    <div className="player-identity">
                        {playerTypes.map((type) =>
                            <PlayerIdentityButton
                                key={`${type}-p3`}
                                type={type}
                                player={newPlayers[2]}
                                onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(2, type)}
                            />
                        )}
                    </div>

                    <p className="new-player-name">Joueur 3</p>
                </div>
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
                <div className="new-player-container">
                    <div className="player-identity">
                        {playerTypes.map((type) =>
                            <PlayerIdentityButton
                                key={`${type}-p1`}
                                type={type}
                                player={newPlayers[0]}
                                onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(0, type)}
                            />
                        )}
                    </div>

                    <p className="new-player-name">Joueur 1</p>
                </div>

                <span className="horizontal-gap"/>

                <div className="new-player-container">
                    <div className="player-identity">
                        {playerTypes.map((type) =>
                            <PlayerIdentityButton
                                key={`${type}-p4`}
                                type={type}
                                player={newPlayers[3]}
                                onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(3, type)}
                            />
                        )}
                    </div>

                    <p className="new-player-name">Joueur 4</p>
                </div>
            </div>
        </div>
    );
}


interface PlayerIdentityButtonProps {
    type: PlayerType;
    player: Player;
    onChangePlayerIdentity: (type: PlayerType) => void;
}

function PlayerIdentityButton({type, player, onChangePlayerIdentity}: PlayerIdentityButtonProps): React.ReactElement {
    const isSelected = player.type === type;

    let icon;
    switch (type) {
        case 'Human':
            icon = Human;
            break;
        case 'AI':
            icon = AI;
            break;
        default:
            icon = Empty;
    }
    const coloredIcon = React.createElement(icon, {
        color: `var(--${isSelected ? player.color : "black"})`
    });

    return (
        <div
            className={`identity-button ${isSelected && "identity-button-pressed"}`}
            onClick={() => onChangePlayerIdentity(type)}
        >
            <span className="identity-button-edge" />
            <div className="identity-button-front">
                {coloredIcon}
            </div>
        </div>
    );
}