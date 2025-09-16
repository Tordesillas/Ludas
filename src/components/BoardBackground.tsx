import React from 'react';
import { PlayerYard } from './PlayerYard.tsx';
import { Shield } from './icons';
import {
    BOTTOM_ARM_TILES,
    END_TILES,
    LEFT_ARM_TILES,
    RIGHT_ARM_TILES,
    TOP_ARM_TILES
} from '../services/TileService.ts';
import type { Tile } from '../models';
import './BoardBackground.css';

export default function BoardBackground(): React.ReactElement {
    return (
        <>
            <div className="outside-line">
                <PlayerYard color="purple" />
                <div className="centered-column">
                    {TOP_ARM_TILES.map((tile) => (
                        <TileArea key={tile.id} tile={tile} />
                    ))}
                </div>
                <PlayerYard color="green" />
            </div>

            <div className="centered-area">
                <div className="centered-line">
                    {LEFT_ARM_TILES.map((tile) => (
                        <TileArea key={tile.id} tile={tile} />
                    ))}
                </div>
                <div className="finish-area">
                    {END_TILES.map((tile) => (
                        <div key={tile.id} id={`tile${tile.id}`} />
                    ))}
                    <div className="triangle green-triangle" />
                    <div className="triangle purple-triangle" />
                    <div className="triangle blue-triangle" />
                    <div className="triangle orange-triangle" />
                </div>
                <div className="centered-line">
                    {RIGHT_ARM_TILES.map((tile) => (
                        <TileArea key={tile.id} tile={tile} />
                    ))}
                </div>
            </div>

            <div className="outside-line">
                <PlayerYard color="orange" />
                <div className="centered-column">
                    {BOTTOM_ARM_TILES.map((tile) => (
                        <TileArea key={tile.id} tile={tile} />
                    ))}
                </div>
                <PlayerYard color="blue" />
            </div>
        </>
    );
}

interface TileAreaProps {
    tile: Tile;
}

function TileArea({ tile }: TileAreaProps): React.ReactElement {
    let backgroundColor = 'var(--white)';
    if (tile?.secure && tile?.isStart) {
        backgroundColor = `var(--${tile.color}-very-light)`;
    } else if (tile?.color) {
        backgroundColor = `var(--${tile.color}-light)`;
    }

    return (
        <div id={`tile${tile.id}`} className="tile" style={{ backgroundColor }}>
            {tile?.secure && <Shield />}
        </div>
    );
}
