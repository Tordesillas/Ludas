import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {Player, Token} from "../models";
import {getYardTiles} from "../services/TileService.ts";

interface GameState {
    isNewGame: boolean;
    isEndGame: boolean;
    players: Player[];
    tokens: Token[];
    playerTurn?: Player;
    playerPlaysAgain: boolean;
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: {
        isNewGame: true,
        isEndGame: false,
        players: [],
        tokens: [],
        playerTurn: undefined,
        playerPlaysAgain: false
    } as GameState,
    reducers: {
        resetGameStore: (state: GameState) => {
            state.isNewGame = true;
            state.isEndGame = false;
            state.players = [];
            state.tokens = [];
            state.playerTurn = undefined;
            state.playerPlaysAgain = false;
        },
        startGame: (state: GameState, action: PayloadAction<Player[]>) => {
            state.players = action.payload;

            const playersTokens: Token[] = [];
            state.players
                .filter((player) => !!player.type)
                .forEach((player) =>
                    playersTokens.push(
                        ...getYardTiles(player.color)
                            .map((tile) => ({color: player.color, tileId: tile.id}))
                    )
                );
            state.tokens = playersTokens;

            state.isNewGame = false;
            state.playerTurn = state.players.filter((player) => !!player.type)[0];
        },
        endGame: (state: GameState) => {
            state.isEndGame = true;
        },
        setInteractiveTokens(state: GameState, action: PayloadAction<Token[]>) {
            state.tokens = state.tokens
                .map((token) => ({
                    ...token,
                    isInteractive: action.payload.some(({tileId, color}) => tileId === token.tileId && color === token.color)
                }));
        },
        cleanInteractiveTokens(state: GameState) {
            state.tokens = state.tokens
                .map((token) => ({...token, isInteractive: false}));
        },
        moveTokenToTile(state: GameState, action: PayloadAction<{color: string, prevTile: number, nextTile: number}>) {
            const tokenToMoveId = state.tokens.findIndex(({tileId, color}) => action.payload.prevTile === tileId && action.payload.color === color)!;
            state.tokens = state.tokens
                .map((token, id) => id !== tokenToMoveId ? token : {...token, tileId: action.payload.nextTile});
        },
        setNextPlayerTurn(state: GameState, action: PayloadAction<Player>) {
            state.playerTurn = action.payload;
        },
        setIfPlayerPlaysAgain(state: GameState, action: PayloadAction<boolean>) {
            state.playerPlaysAgain = action.payload;
        }
    },
    selectors: {
        selectIsNewGame: state => state.isNewGame,
        selectIsEndGame: state => state.isEndGame,
        selectPlayers: state => state.players,
        selectTokens: state => state.tokens,
        selectPlayerTurn: state => state.playerTurn
    }
});

export const {resetGameStore, startGame, endGame, setInteractiveTokens, cleanInteractiveTokens, moveTokenToTile, setNextPlayerTurn, setIfPlayerPlaysAgain} = gameSlice.actions;
export const {selectIsNewGame, selectIsEndGame, selectPlayers, selectTokens, selectPlayerTurn} = gameSlice.selectors;
export default gameSlice.reducer;