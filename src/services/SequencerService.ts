import {findBestTokenToMove, getDiceResult, getMovableTokens, getPlayerProgress} from "./StrategyService.ts";
import {getYardTiles, isAnEndTile, isSecuredTile, tileIn1Step} from "./TileService.ts";
import {store} from "../store/store.ts";
import {
    cleanInteractiveTokens,
    endGame,
    moveTokenToTile,
    resetGameStore,
    setIfPlayerPlaysAgain,
    setInteractiveTokens,
    setNextPlayerTurn
} from "../store/gameSlice.ts";
import {
    changeRollTheDiceAvailability,
    cleanDice,
    resetDiceStore,
    saveDiceRoll,
    setDiceVisibility
} from "../store/diceSlice.ts";
import type {Token} from "../models";

export function nextMove() {
    const {playerTurn} = store.getState().game;

    if (!playerTurn) return;

    if (playerTurn.type === 'AI') {
        rollTheDice();
    } else {
        store.dispatch(changeRollTheDiceAvailability(true));
    }
}

export function rollTheDice() {
    store.dispatch(changeRollTheDiceAvailability(false));

    const dice = getDiceResult();
    store.dispatch(saveDiceRoll(dice));

    store.dispatch(setDiceVisibility(true));

    setTimeout(() => {
        // Skip if it's the third 6
        if (dice === 6) {
            if (store.getState().dice.playerDices.slice(-3).reduce((acc, e) => acc + e, 0) === 18) {
                prepareNextMove();
                return;
            } else {
                store.dispatch(setIfPlayerPlaysAgain(true));
            }
        }

        // No player turn = game reset
        const playerTurn = store.getState().game.playerTurn;
        if (!playerTurn) return;

        // Unlock the human player tokens
        if (playerTurn.type === 'Human') {
            const availableTokens = getMovableTokens(playerTurn.color, dice);
            if (availableTokens.length === 0) {
                prepareNextMove();
                return;
            }

            store.dispatch(setInteractiveTokens(availableTokens));
        }

        // Move the AI tokens
        else {
            setTimeout(() => {
                const tokenToMove = findBestTokenToMove(playerTurn.color, dice);
                if (tokenToMove) {
                    moveToken(tokenToMove);
                } else {
                    prepareNextMove();
                }
            }, 400); // Wait artificially for the AI to think
        }
    }, 2000); // Wait for dice animation
}

export function moveToken(token: Token) {
    store.dispatch(cleanInteractiveTokens());

    const {playerDices} = store.getState().dice;
    let dice = playerDices[playerDices.length - 1];

    // Takes the token out of its yard
    if (token.tileId < 0 && dice === 6) {
        dice = 1;
    }

    // Moves the token tile by tile
    const TIME_FOR_TILE_ANIMATION = 100;
    let waitTimes = 0;
    const tilesToPass = [token.tileId];
    while (waitTimes < dice) {
        tilesToPass.push(tileIn1Step(tilesToPass[tilesToPass.length - 1], token.color));
        waitTimes++;
    }
    waitTimes = 0;
    while (waitTimes < dice) {
        const tokenMove = {color: token.color, prevTile: tilesToPass[waitTimes], nextTile: tilesToPass[waitTimes + 1]};
        setTimeout(() => store.dispatch(moveTokenToTile(tokenMove)),
            waitTimes * TIME_FOR_TILE_ANIMATION);
        waitTimes++;
    }

    // Initiates a possible kill
    if (!isSecuredTile(tilesToPass[tilesToPass.length - 1])) {
        const tokensToKill = store.getState().game.tokens
            .filter(({color}) => color !== token.color)
            .filter(({tileId}) => tileId === tilesToPass[tilesToPass.length - 1]);
        if (tokensToKill.length) {
            store.dispatch(setIfPlayerPlaysAgain(true));
            setTimeout(() => tokensToKill.forEach((token) => sendTokenHome(token)),
                waitTimes * TIME_FOR_TILE_ANIMATION);
            waitTimes++;
        }
    }

    // Allows to play again if the token goes to the end
    if (isAnEndTile(tilesToPass[tilesToPass.length - 1])) {
        store.dispatch(setIfPlayerPlaysAgain(true));
    }

    setTimeout(() => prepareNextMove(), waitTimes * TIME_FOR_TILE_ANIMATION);
}

function sendTokenHome(token: Token) {
    const yardTiles = getYardTiles(token.color);
    const occupiedTiles = store.getState().game.tokens.map(({tileId}) => tileId);
    const unoccupiedTile = yardTiles.find(({id}) => !occupiedTiles.includes(id))!;

    store.dispatch(moveTokenToTile({color: token.color, prevTile: token.tileId, nextTile: unoccupiedTile.id}));
}

function prepareNextMove() {
    store.dispatch(setDiceVisibility(false));

    const playerColors = store.getState().game.players.map(({color}) => color);
    if (playerColors.some((color) => getPlayerProgress(color) === 1)) {
        store.dispatch(cleanDice());
        store.dispatch(endGame());
        return;
    }

    const TIME_BEFORE_NEXT_TURN = 600;

    if (store.getState().game.playerPlaysAgain) {
        setTimeout(() => {
            store.dispatch(setIfPlayerPlaysAgain(false));
            nextMove();
        }, TIME_BEFORE_NEXT_TURN);
        return;
    }

    setTimeout(() => {
        const {players, playerTurn} = store.getState().game;
        const playingPlayers = players.filter((player) => !!player.type);
        const nextPlayer = [...playingPlayers, ...playingPlayers][
            playingPlayers.findIndex(({color}) => color === playerTurn!.color) + 1
        ];
        store.dispatch(setNextPlayerTurn(nextPlayer));

        store.dispatch(cleanDice());

        nextMove();
    }, TIME_BEFORE_NEXT_TURN);
}

export function resetGame() {
    store.dispatch(resetGameStore());
    store.dispatch(resetDiceStore());
}