import React from "react";
import {useSelector} from "react-redux";
import BoardBackground from "./BoardBackground.tsx";
import Leaderboard from "./Leaderboard.tsx";
import NewGameOverlay from "./NewGameOverlay.tsx";
import TokenTile from "./TokenTile.tsx";
import {selectIsEndGame, selectIsNewGame, selectPlayerTurn, selectTokens} from "../store/gameSlice.ts";
import "./Board.css";

export default function Board(): React.ReactElement {
    const isNewGame = useSelector(selectIsNewGame);
    const isEndGame = useSelector(selectIsEndGame);
    const tokens = useSelector(selectTokens);
    const playerTurn = useSelector(selectPlayerTurn);

    return (
        <div className="board" style={{filter: `drop-shadow(0 0 4rem var(--${playerTurn?.color ?? "default"}))`}}>
            <BoardBackground />

            {isNewGame && (
                <NewGameOverlay />
            )}
            {isEndGame && (
                <Leaderboard />
            )}

            {tokens.map((token, index) => (
                <TokenTile
                    key={index}
                    token={token}
                    index={index}
                    floor={tokens.slice(0, index).filter(({tileId}) => tileId === token.tileId).length}
                />
            ))}
        </div>
    );
}