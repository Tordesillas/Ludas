import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AI, Empty, Human, Play} from "./icons";
import {nextMove} from "../services/SequencerService.ts";
import {startGame} from "../store/gameSlice.ts";
import type {Player} from "../models";
import "./NewGameOverlay.css";

export default function NewGameOverlay(): React.ReactElement {
    const dispatch = useDispatch();
    const [newPlayers, setNewPlayers] = useState<Player[]>([
        {color: "orange", type: 'Human'},
        {color: "purple", type: null},
        {color: "green", type: 'AI'},
        {color: "blue", type: null}
    ]);

    function changePlayerIdentity(playerIndex: number, type: 'AI' | 'Human' | null) {
        setNewPlayers([...newPlayers].map((player, index) => {
            if (playerIndex === index) {
                return {...player, type: type};
            } else {
                return player;
            }
        }));
    }

    function onPlayButtonPressed() {
        dispatch(startGame(newPlayers));
        nextMove();
    }

    return (
        <div className="new-game-overlay">
            <div className="overlay-outside-line">
                <PlayerIdentityOverlay
                    player={newPlayers[1]}
                    index={1}
                    onChangePlayerIdentity={(type: 'AI' | 'Human' | null) => changePlayerIdentity(1, type)}
                />
                <div className="player-identity-space"/>
                <PlayerIdentityOverlay
                    player={newPlayers[2]}
                    index={2}
                    onChangePlayerIdentity={(type: 'AI' | 'Human' | null) => changePlayerIdentity(2, type)}
                />
            </div>

            <div className="overlay-centered-area">
                <div className="play-button" onClick={onPlayButtonPressed}>
                    <Play color="var(--default)" />
                </div>
            </div>

            <div className="overlay-outside-line">
                <PlayerIdentityOverlay
                    player={newPlayers[0]}
                    index={0}
                    onChangePlayerIdentity={(type: 'AI' | 'Human' | null) => changePlayerIdentity(0, type)}
                />
                <div className="player-identity-space"/>
                <PlayerIdentityOverlay
                    player={newPlayers[3]}
                    index={3}
                    onChangePlayerIdentity={(type: 'AI' | 'Human' | null) => changePlayerIdentity(3, type)}
                />
            </div>
        </div>
    );
}

interface PlayerIdentityOverlayProps {
    player: Player;
    index: number;
    onChangePlayerIdentity: (type: 'AI' | 'Human' | null) => void;
}

function PlayerIdentityOverlay({player, index, onChangePlayerIdentity}: PlayerIdentityOverlayProps): React.ReactElement {
    const playerColor = `var(--${player.color})`;

    const isHuman = player.type === 'Human';
    const isAI = player.type === 'AI';
    const isAnybody = player.type === null;

    return (
        <div className="player-identity-wrapper">
            <div className="player-identity">
                <div
                    className="player-identity-button"
                    style={{cursor: isHuman ? "auto" : "pointer", backgroundColor: isHuman ? 'var(--white)' : 'var(--grey)'}}
                    onClick={() => onChangePlayerIdentity('Human')}
                >
                    <Human color={isHuman ? playerColor : undefined} />
                </div>
                <div
                    className="player-identity-button"
                    style={{cursor: isAI ? "auto" : "pointer", backgroundColor: isAI ? 'var(--white)' : 'var(--grey)'}}
                    onClick={() => onChangePlayerIdentity('AI')}
                >
                    <AI color={isAI ? playerColor : undefined} />
                </div>
                <div
                    className="player-identity-button"
                    style={{cursor: isAnybody ? "auto" : "pointer", backgroundColor: isAnybody ? 'var(--white)' : 'var(--grey)'}}
                    onClick={() => onChangePlayerIdentity(null)}
                >
                    <Empty color={isAnybody ? playerColor : undefined} />
                </div>
            </div>

            <p className="new-player-name">Joueur {index + 1}</p>
        </div>
    );
}