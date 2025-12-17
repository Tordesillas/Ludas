import React from 'react';
import { PlayerYard } from './PlayerYard.tsx';
import { Shield } from './icons';
import { TILES } from '../services/TileService.ts';
import type { Tile } from '../models';
import './BoardBackground.css';

export default function BoardBackground(): React.ReactElement {
    return (
        <>
            <PlayerYard color="purple" row={1} column={1} />
            <PlayerYard color="green" row={1} column={10} />
            <PlayerYard color="orange" row={10} column={1} />
            <PlayerYard color="blue" row={10} column={10} />

            {TILES.map((tile) => (
                <TileArea key={tile.id} tile={tile} />
            ))}

            <span className="end-area">
                <div className="triangle green-triangle" />
                <div className="triangle purple-triangle" />
                <div className="triangle blue-triangle" />
                <div className="triangle orange-triangle" />
            </span>
        </>
    );
}

interface TileAreaProps {
    tile: Tile;
}

function TileArea({ tile }: TileAreaProps): React.ReactElement {
    let tileColor = 'var(--white)';
    if (tile?.secure && tile?.isStart) {
        tileColor = `var(--${tile.color}-very-light)`;
    } else if (tile?.color) {
        tileColor = `var(--${tile.color}-light)`;
    }

    const style = {
        backgroundColor: tileColor,
        gridRow: 15 - tile.y,
        gridColumn: tile.x + 1
    };

    return (
        <div id={`tile${tile.id}`} style={style}>
            {tile?.secure && <Shield />}
        </div>
    );
}
