import {configureStore} from "@reduxjs/toolkit";
import diceReducer from "./diceSlice.ts";
import gameReducer from "./gameSlice.ts";

export const store = configureStore({
    reducer: {
        dice: diceReducer,
        game: gameReducer
    }
});