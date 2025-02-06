import React from "react";

export default function Shield(): React.ReactElement {
    return (
        <svg
            viewBox="0 0 24 24"
            style={{display: "flex", flex: 1, aspectRatio: 1}}
        >
            <path
                d="M20 6C20 6 19.1843 6 19.0001 6C16.2681 6 13.8871 4.93485 11.9999 3C10.1128 4.93478 7.73199 6 5.00009 6C4.81589 6 4.00009 6 4.00009 6C4.00009 6 4 8 4 9.16611C4 14.8596 7.3994 19.6436 12 21C16.6006 19.6436 20 14.8596 20 9.16611C20 8 20 6 20 6Z"
                stroke="#6A6A6A"
                strokeWidth="2"
                fill="none"
            />
        </svg>
    );
}