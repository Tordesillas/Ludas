import React from 'react';

interface Props {
    color?: string;
}

export default function Reset({ color = 'white' }: Props): React.ReactElement {
    return (
        <svg viewBox="0 0 21 21" style={{ display: 'flex', flex: 1, aspectRatio: 1 }}>
            <defs>
                <filter id="shadow" x="-25%" y="-25%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor="white" />
                </filter>
            </defs>
            <g
                fill="none"
                fillRule="evenodd"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                transform="translate(2 2)"
                style={{ filter: 'url(#shadow)' }}
            >
                <path d="m4.5 1.5c-2.4138473 1.37729434-4 4.02194088-4 7 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8" />
                <path d="m4.5 5.5v-4h-4" />
            </g>
        </svg>
    );
}
