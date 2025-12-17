import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AI, Human, Play } from './icons';
import { nextMove } from '../services/SequencerService.ts';
import { startGame } from '../store/gameSlice.ts';
import type { Player } from '../models';
import './NewGameOverlay.css';

type PlayerType = 'AI' | 'Human' | null;

export default function NewGameOverlay(): React.ReactElement {
    const dispatch = useDispatch();
    const [newPlayers, setNewPlayers] = useState<Player[]>([
        { color: 'orange', type: 'Human' },
        { color: 'purple', type: null },
        { color: 'green', type: 'AI' },
        { color: 'blue', type: null }
    ]);

    function changePlayerIdentity(playerIndex: number, type: PlayerType) {
        setNewPlayers(
            [...newPlayers].map((player, index) => {
                if (playerIndex === index) {
                    return { ...player, type: type };
                } else {
                    return player;
                }
            })
        );
    }

    function onPlayButtonPressed() {
        setTimeout(() => {
            dispatch(startGame(newPlayers));
            nextMove();
        }, 100);
    }

    return (
        <div className="new-game-overlay">
            {Array.from({ length: 4 }).map((_, i) => (
                <PlayerIdentitySelector
                    row={i === 1 || i === 2 ? 1 : 3}
                    column={i === 0 || i === 1 ? 1 : 3}
                    player={newPlayers[i]}
                    playerPos={i}
                    onChangePlayerIdentity={(type: PlayerType) => changePlayerIdentity(i, type)}
                />
            ))}

            <div className="centered-area">
                <div className="play-button" onClick={onPlayButtonPressed}>
                    <span className="play-button-edge" />
                    <div className="play-button-front">
                        <Play color="var(--default)" />
                    </div>
                </div>
            </div>
        </div>
    );
}

interface PlayerIdentitySelectorProps {
    row: number;
    column: number;
    player: Player;
    playerPos: number;
    onChangePlayerIdentity: (type: PlayerType) => void;
}

function PlayerIdentitySelector({
    row,
    column,
    player,
    playerPos,
    onChangePlayerIdentity
}: PlayerIdentitySelectorProps): React.ReactElement {
    const isHuman = player.type === 'Human';
    const isAI = player.type === 'AI';

    return (
        <div className="new-player-container" style={{ gridRow: row, gridColumn: column }}>
            <div className="player-identity">
                <div
                    className={`identity-button ${isHuman ? 'identity-button-pressed' : ''}`}
                    onClick={() => onChangePlayerIdentity(isHuman ? null : 'Human')}
                >
                    <span className="identity-button-edge" />
                    <div className="identity-button-front">
                        <Human color={isHuman ? player.color : 'var(--black)'} />
                    </div>
                </div>
                <div
                    className={`identity-button ${isAI ? 'identity-button-pressed' : ''}`}
                    onClick={() => onChangePlayerIdentity(isAI ? null : 'AI')}
                >
                    <span className="identity-button-edge" />
                    <div className="identity-button-front">
                        <AI color={isAI ? player.color : 'var(--black)'} />
                    </div>
                </div>
            </div>

            <p className="new-player-name">Joueur {playerPos + 1}</p>
        </div>
    );
}
