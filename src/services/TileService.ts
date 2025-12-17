import type { Tile } from '../models';

export function getTile(tileId: number): Tile {
    if (tileId < 0) {
        return YARD_TILES.find(({ id }) => id === tileId)!;
    } else {
        return TILES.find(({ id }) => id === tileId)!;
    }
}

export function getYardTiles(color: string): Tile[] {
    switch (color) {
        case 'orange':
            return ORANGE_YARD_TILES;
        case 'purple':
            return PURPLE_YARD_TILES;
        case 'green':
            return GREEN_YARD_TILES;
        case 'blue':
            return BLUE_YARD_TILES;
        default:
            return [];
    }
}

export function tileInNStep(tileId: number, step: number, playerColor: string): number {
    if (tileId < 0) {
        if (step === 6) {
            step = 1;
        } else {
            step = 0;
        }
    }

    let nextTile = tileId;
    for (let i = 0; i < step; i++) {
        nextTile = tileIn1Step(nextTile, playerColor);
    }
    return nextTile;
}

export function tileIn1Step(tileId: number, playerColor: string): number {
    if (tileId < 0) {
        return getStartTileId(playerColor);
    }

    if (playerColor === 'orange' && tileId === 52) {
        return 101;
    } else if (playerColor === 'purple' && tileId === 13) {
        return 201;
    } else if (playerColor === 'green' && tileId === 26) {
        return 301;
    } else if (playerColor === 'blue' && tileId === 39) {
        return 401;
    }

    if (tileId === 52) {
        return 1;
    }

    return tileId + 1;
}

export function isTileOutOfBound(tileId: number): boolean {
    return (
        tileId < 0 ||
        (106 < tileId && tileId < 200) ||
        (206 < tileId && tileId < 300) ||
        (306 < tileId && tileId < 400) ||
        406 < tileId
    );
}

export function getStartTileId(color: string): number {
    return TILES.find((tile) => tile.isStart && tile.color === color)!.id;
}

export function isSecuredTile(tileId: number): boolean {
    return getTile(tileId).secure || false;
}

export function isAnEndTile(tileId: number): boolean {
    return [106, 206, 306, 406].includes(tileId);
}

export const TILES: Tile[] = [
    { id: 25, x: 6, y: 14 },
    { id: 26, x: 7, y: 14 },
    { id: 27, x: 8, y: 14 },
    { id: 24, x: 6, y: 13 },
    { id: 301, x: 7, y: 13, color: 'green' },
    { id: 28, x: 8, y: 13, color: 'green', isStart: true, secure: true },
    { id: 23, x: 6, y: 12, secure: true },
    { id: 302, x: 7, y: 12, color: 'green' },
    { id: 29, x: 8, y: 12 },
    { id: 22, x: 6, y: 11 },
    { id: 303, x: 7, y: 11, color: 'green' },
    { id: 30, x: 8, y: 11 },
    { id: 21, x: 6, y: 10 },
    { id: 304, x: 7, y: 10, color: 'green' },
    { id: 31, x: 8, y: 10 },
    { id: 20, x: 6, y: 9 },
    { id: 305, x: 7, y: 9, color: 'green' },
    { id: 32, x: 8, y: 9 },
    { id: 6, x: 6, y: 5 },
    { id: 105, x: 7, y: 5, color: 'orange' },
    { id: 46, x: 8, y: 5 },
    { id: 5, x: 6, y: 4 },
    { id: 104, x: 7, y: 4, color: 'orange' },
    { id: 47, x: 8, y: 4 },
    { id: 4, x: 6, y: 3 },
    { id: 103, x: 7, y: 3, color: 'orange' },
    { id: 48, x: 8, y: 3 },
    { id: 3, x: 6, y: 2 },
    { id: 102, x: 7, y: 2, color: 'orange' },
    { id: 49, x: 8, y: 2, secure: true },
    { id: 2, x: 6, y: 1, color: 'orange', isStart: true, secure: true },
    { id: 101, x: 7, y: 1, color: 'orange' },
    { id: 50, x: 8, y: 1 },
    { id: 1, x: 6, y: 0 },
    { id: 52, x: 7, y: 0 },
    { id: 51, x: 8, y: 0 },
    { id: 14, x: 0, y: 8 },
    { id: 15, x: 1, y: 8, color: 'purple', isStart: true, secure: true },
    { id: 16, x: 2, y: 8 },
    { id: 17, x: 3, y: 8 },
    { id: 18, x: 4, y: 8 },
    { id: 19, x: 5, y: 8 },
    { id: 13, x: 0, y: 7 },
    { id: 201, x: 1, y: 7, color: 'purple' },
    { id: 202, x: 2, y: 7, color: 'purple' },
    { id: 203, x: 3, y: 7, color: 'purple' },
    { id: 204, x: 4, y: 7, color: 'purple' },
    { id: 205, x: 5, y: 7, color: 'purple' },
    { id: 12, x: 0, y: 6 },
    { id: 11, x: 1, y: 6 },
    { id: 10, x: 2, y: 6, secure: true },
    { id: 9, x: 3, y: 6 },
    { id: 8, x: 4, y: 6 },
    { id: 7, x: 5, y: 6 },
    { id: 33, x: 9, y: 8 },
    { id: 34, x: 10, y: 8 },
    { id: 35, x: 11, y: 8 },
    { id: 36, x: 12, y: 8, secure: true },
    { id: 37, x: 13, y: 8 },
    { id: 38, x: 14, y: 8 },
    { id: 405, x: 9, y: 7, color: 'blue' },
    { id: 404, x: 10, y: 7, color: 'blue' },
    { id: 403, x: 11, y: 7, color: 'blue' },
    { id: 402, x: 12, y: 7, color: 'blue' },
    { id: 401, x: 13, y: 7, color: 'blue' },
    { id: 39, x: 14, y: 7 },
    { id: 45, x: 9, y: 6 },
    { id: 44, x: 10, y: 6 },
    { id: 43, x: 11, y: 6 },
    { id: 42, x: 12, y: 6 },
    { id: 41, x: 13, y: 6, color: 'blue', isStart: true, secure: true },
    { id: 40, x: 14, y: 6 },
    { id: 1001, x: 6, y: 8 },
    { id: 306, x: 7, y: 8 },
    { id: 1002, x: 8, y: 8 },
    { id: 206, x: 6, y: 7 },
    { id: 1003, x: 7, y: 7 },
    { id: 406, x: 8, y: 7 },
    { id: 1004, x: 6, y: 6 },
    { id: 106, x: 7, y: 6 },
    { id: 1005, x: 8, y: 6 }
].sort((t1, t2) => t1.id - t2.id);

const ORANGE_YARD_TILES: Tile[] = [
    { id: -100, x: 1.35, y: 3.6 },
    { id: -101, x: 3.65, y: 3.6 },
    { id: -102, x: 1.35, y: 1.35 },
    { id: -103, x: 3.65, y: 1.35 }
];
const PURPLE_YARD_TILES: Tile[] = [
    { id: -200, x: 1.35, y: 12.6 },
    { id: -201, x: 3.65, y: 12.6 },
    { id: -202, x: 1.35, y: 10.35 },
    { id: -203, x: 3.65, y: 10.35 }
];
const GREEN_YARD_TILES: Tile[] = [
    { id: -300, x: 10.35, y: 12.6 },
    { id: -301, x: 12.65, y: 12.6 },
    { id: -302, x: 10.35, y: 10.35 },
    { id: -303, x: 12.65, y: 10.35 }
];
const BLUE_YARD_TILES: Tile[] = [
    { id: -400, x: 10.35, y: 3.6 },
    { id: -401, x: 12.65, y: 3.6 },
    { id: -402, x: 10.35, y: 1.35 },
    { id: -403, x: 12.65, y: 1.35 }
];
const YARD_TILES: Tile[] = [...ORANGE_YARD_TILES, ...PURPLE_YARD_TILES, ...GREEN_YARD_TILES, ...BLUE_YARD_TILES].sort(
    (t1, t2) => t1.id - t2.id
);
