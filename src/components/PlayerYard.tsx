import React from 'react';
import './PlayerYard.css';

interface Props {
    color: string;
    row: number;
    column: number;
}

export function PlayerYard({ color, row, column }: Props): React.ReactElement {
    const style = {
        backgroundColor: `var(--${color}-light)`,
        gridRowStart: row,
        gridRowEnd: row + 6,
        gridColumnStart: column,
        gridColumnEnd: column + 6
    };

    return (
        <div className="yard" style={style}>
            {[1, 2, 3, 4].map((n) => (
                <span className={`yard-token-support yard-token-support-${color}`} key={n} />
            ))}
        </div>
    );
}
