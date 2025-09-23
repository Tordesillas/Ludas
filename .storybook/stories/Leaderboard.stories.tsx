import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Leaderboard from '../../src/components/Leaderboard';
import gameReducer from '../../src/store/gameSlice';
import type { Player } from '../../src/models';

const meta = {
    component: Leaderboard
} satisfies Meta<typeof Leaderboard>;
export default meta;

type Story = StoryObj<typeof Leaderboard>;

const createStore = (preloadedState: { game: any }) => {
    return configureStore({
        reducer: {
            game: gameReducer
        },
        preloadedState
    });
};

const withStore = (state: any) => (Story: any) => {
    const store = createStore(state);
    return (
        <Provider store={store}>
            <Story />
        </Provider>
    );
};

export const TwoPlayersLeaderboard: Story = {
    args: {},
    decorators: [
        withStore({
            game: {
                isNewGame: false,
                isEndGame: true,
                players: [
                    { color: 'orange', type: 'Human' },
                    { color: 'green', type: 'AI' }
                ] satisfies Player[],
                tokens: [],
                playerTurn: undefined,
                playerPlaysAgain: false
            }
        })
    ]
};

export const FourPlayersLeaderboard: Story = {
    args: {},
    decorators: [
        withStore({
            game: {
                isNewGame: false,
                isEndGame: true,
                players: [
                    { color: 'orange', type: 'Human' },
                    { color: 'purple', type: 'AI' },
                    { color: 'green', type: 'AI' },
                    { color: 'blue', type: 'AI' }
                ] satisfies Player[],
                tokens: [],
                playerTurn: undefined,
                playerPlaysAgain: false
            }
        })
    ]
};
