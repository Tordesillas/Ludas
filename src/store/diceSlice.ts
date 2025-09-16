import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DiceState {
    playerDices: number[];
    isDiceVisible: boolean;
    isRollTheDiceAvailable: boolean;
}

export const diceSlice = createSlice({
    name: 'dice',
    initialState: {
        playerDices: [],
        isDiceVisible: false,
        isRollTheDiceAvailable: false
    } as DiceState,
    reducers: {
        resetDiceStore: (state: DiceState) => {
            state.playerDices = [];
            state.isDiceVisible = false;
            state.isRollTheDiceAvailable = false;
        },
        saveDiceRoll(state: DiceState, action: PayloadAction<number>) {
            state.playerDices = [...state.playerDices, action.payload];
        },
        cleanDice(state: DiceState) {
            state.playerDices = [];
        },
        setDiceVisibility(state: DiceState, action: PayloadAction<boolean>) {
            state.isDiceVisible = action.payload;
        },
        changeRollTheDiceAvailability: (state: DiceState, action: PayloadAction<boolean>) => {
            state.isRollTheDiceAvailable = action.payload;
        }
    },
    selectors: {
        selectDice: (state) => state.playerDices[state.playerDices.length - 1],
        selectDiceVisibility: (state) => state.isDiceVisible,
        selectIsRollTheDiceAvailable: (state) => state.isRollTheDiceAvailable
    }
});

export const { resetDiceStore, saveDiceRoll, cleanDice, setDiceVisibility, changeRollTheDiceAvailability } =
    diceSlice.actions;
export const { selectDice, selectDiceVisibility, selectIsRollTheDiceAvailable } = diceSlice.selectors;
export default diceSlice.reducer;
