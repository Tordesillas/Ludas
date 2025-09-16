import React from 'react';

interface Props {
    color?: string;
}

export default function AI({ color = 'black' }: Props): React.ReactElement {
    return (
        <svg viewBox="0 0 24 24" style={{ display: 'flex', flex: 1, aspectRatio: 1, fill: color }}>
            <path d="M9 15a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1ZM15 15a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1ZM6 8a1 1 0 0 1-.71-.29l-3-3a1 1 0 0 1 1.42-1.42l3 3a1 1 0 0 1 0 1.42A1 1 0 0 1 6 8ZM18 8a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42l3-3a1 1 0 1 1 1.42 1.42l-3 3A1 1 0 0 1 18 8Z" />
            <path d="M21 20H3a1 1 0 0 1-1-1v-4.5a10 10 0 0 1 20 0V19a1 1 0 0 1-1 1ZM4 18h16v-3.5a8 8 0 0 0-16 0Z" />
        </svg>
    );
}
