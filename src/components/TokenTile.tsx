import React, { useEffect, useRef } from 'react';
import { moveToken } from '../services/SequencerService.ts';
import { getTile } from '../services/TileService.ts';
import type { Token } from '../models';
import './TokenTile.css';

interface Props {
    token: Token;
    index: number;
    floor: number;
}

export default function TokenTile({ token, index, floor }: Props): React.ReactElement {
    const prevTileId = useRef<number>(0);
    useEffect(() => {
        if (token.tileId !== prevTileId.current) {
            const boardTile = getTile(token.tileId);
            const tokenDiv = document.getElementById(`token${index}`)!;

            tokenDiv.style.left = `calc(min(95vw, 35rem) / 15 * ${boardTile.x})`;
            tokenDiv.style.bottom = `calc(min(95vw, 35rem) / 15 * ${boardTile.y})`;
        }
        prevTileId.current = token.tileId;
    }, [token]);

    const prevFloor = useRef<number>(0);
    useEffect(() => {
        if (floor !== prevFloor.current) {
            const tokenDiv = document.getElementById(`token${index}`)!.firstElementChild as HTMLElement;
            tokenDiv.style.transform = `translateY(-${floor * 6}px) rotateX(30deg)`;

            prevFloor.current = floor;
        }
    }, [floor]);

    function onClick() {
        if (token.isInteractive) {
            moveToken(token);
        }
    }

    return (
        <div
            className={`token-tile ${token.isInteractive ? 'interactive-token-tile' : ''}`}
            id={`token${index}`}
            onClick={onClick}
        >
            <div className="token">
                <span className="token-layer" style={{ backgroundColor: `var(--${token.color}-dark)` }} />
                <span className="token-layer" style={{ backgroundColor: `var(--${token.color})` }}>
                    {token.isInteractive && <span className="interactive-halo" />}
                </span>
            </div>
        </div>
    );
}
