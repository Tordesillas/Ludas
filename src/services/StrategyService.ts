import {getStartTileId, getTile, isAnEndTile, isSecuredTile, isTileOutOfBound, tileInNStep} from "./TileService.ts";
import {store} from "../store/store.ts";
import type {Token} from "../models";

export function getMovableTokens(color: string, stepsToDo: number): Token[] {
    const playerTokens = store.getState().game.tokens
        .filter((token) => token.color === color);

    const nextTiles = playerTokens
        .map((token) => tileInNStep(token.tileId, stepsToDo, color));

    return playerTokens
        .filter((_, index) => !isTileOutOfBound(nextTiles[index]));
}

export function getPlayerProgress(color: string): number {
    const playerTokens = store.getState().game.tokens
        .filter((token) => token.color === color);

    const tilesTraveled = playerTokens
        .map(({tileId}) => tileId)
        .reduce((acc, tileId) => acc + getTokenProgress(tileId, color), 0);

    return tilesTraveled / (59 * 4);
}

function getTokenProgress(tileId: number, color: string): number {
    if (tileId < 0) return 0;
    if (tileId > 100) {
        return 53 + parseInt(`${tileId}`[2]);
    }
    return (tileId + (52 - getStartTileId(color))) % 52 + 1;
}

export function findBestTokenToMove(color: string, stepsToDo: number): Token | null {
    const availableTokens = getMovableTokens(color, stepsToDo);

    if (availableTokens.length === 0) {
        return null;
    } else if (availableTokens.length === 1) {
        return availableTokens[0];
    } else {
        const weightedTokenMoves = availableTokens
            .map((token) => ({token, weight: evaluateTokenMove(token, stepsToDo)}));

        const min = 1;
        const max = weightedTokenMoves.reduce((acc, {weight}) => acc + weight, 0);
        const randomChoice = Math.floor(Math.random() * (max - min + 1)) + min;

        let acc = 0;
        for (let i = 0; i < weightedTokenMoves.length; i++) {
            acc += weightedTokenMoves[i].weight;

            if (randomChoice <= acc) {
                return weightedTokenMoves[i].token;
            }
        }

        return null;
    }
}

function evaluateTokenMove(token: Token, dice: number): number {
    const tileAfterMove = tileInNStep(token.tileId, dice, token.color);

    if (token.tileId < 0) {
        return 100;
    } else if (token.tileId > 100) {
        if (isAnEndTile(tileAfterMove)) {
            return (7 - dice) * 10;
        } else {
            return 10 - dice;
        }
    }

    const canKill = store.getState().game.tokens
        .filter(({color}) => color !== token.color)
        .some(({tileId}) => tileId === tileAfterMove);
    const canKillBonus = canKill ? 80 : 0;

    const tileProgress = (token.tileId + (52 - getStartTileId(token.color))) % 52 + 1;
    const farAwayBonus = Math.floor(tileProgress / 2);

    const hasBestProgress = !store.getState().game.tokens
        .filter(({color}) => color === token.color)
        .some(({tileId, color}) => getTokenProgress(tileId, color) > getTokenProgress(token.tileId, color) && tileId < 100);
    const bestProgressBonus = hasBestProgress ? 20 : 0;

    const secureBonus = getTile(tileAfterMove).secure ? 30 : 0;
    const secureMalus = isSecuredTile(token.tileId) ? -20 : 0;
    const homeColumnBonus = (tileAfterMove > 100) ? 30 : 0;

    const howManyTokensBehind = store.getState().game.tokens
        .filter(({color}) => color !== token.color)
        .filter(({tileId}) => (token.tileId - 6 + 52) % 52 <= tileId && tileId <= token.tileId)
        .length;
    const dangerBonus = howManyTokensBehind * 3;

    const bonus = canKillBonus + farAwayBonus + bestProgressBonus + secureBonus + secureMalus + homeColumnBonus + dangerBonus;

    return Math.max(bonus, 5);
}

export function getDiceResult(): number {
    const rollWeight = Array.from({length: 6}, (_, i) => ({v: i + 1, w: 10}));

    const playerColor = store.getState().game.playerTurn!.color;
    const tokens = store.getState().game.tokens;

    if (!tokens.filter(({color}) => color === playerColor).some(({tileId}) => !isAnEndTile(tileId) && tileId > 0)) {
        rollWeight[5].w += 20;
    }

    const min = 1;
    const max = rollWeight.reduce((acc, {w}) => acc + w, 0);
    const randomChoice = Math.floor(Math.random() * (max - min + 1)) + min;

    let acc = 0;
    for (let i = 0; i < rollWeight.length; i++) {
        acc += rollWeight[i].w;

        if (randomChoice <= acc) {
            return rollWeight[i].v;
        }
    }

    return 6;
}