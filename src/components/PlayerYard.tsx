import React from 'react';
import './PlayerYard.css';

interface Props {
    color: string;
}

export function PlayerYard({ color }: Props): React.ReactElement {
    return (
        <div className="player-yard" style={{ backgroundColor: `var(--${color}-light)` }}>
            <div className="yard-area">
                {[1, 2, 3, 4].map((n) => (
                    <div className={`yard-token-support yard-token-support-${color}`} key={n} />
                ))}
            </div>
        </div>
    );
}
