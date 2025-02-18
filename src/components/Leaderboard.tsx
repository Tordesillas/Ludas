import React from "react";
import {useSelector} from "react-redux";
import {resetGame} from "../services/SequencerService.ts";
import {getPlayerProgress} from "../services/StrategyService.ts";
import {selectPlayers} from "../store/gameSlice.ts";
import "./Leaderboard.css";

export default function Leaderboard(): React.ReactElement {
    const players = useSelector(selectPlayers);

    const leaderboard = players
        .filter((player) => !!player.type)
        .map(({color}) => ({color, score: getPlayerProgress(color)}))
        .sort((p1, p2) => p2.score - p1.score);

    return (
        <div className="leaderboard-overlay">
            <div className="leaderboard" style={{borderColor: `var(--${leaderboard[0].color}-very-light)`}}>
                <p className="leaderboard-title">Fin de la partie !</p>

                {leaderboard.map((player, index) => (
                    <div key={player.color} className="leaderboard-item">
                        <p className="player-position">{index + 1}.</p>
                        <p className="player-name" style={{color: `var(--${player.color})`}}>
                            Joueur <span style={{textTransform: "capitalize"}}>{player.color}</span>
                        </p>
                        <p>{Math.floor(player.score * 100)}%</p>
                    </div>
                ))}

                <div className="leaderboard-reset" onClick={() => resetGame()}>
                    Relancer une partie
                </div>
            </div>
        </div>
    );
}