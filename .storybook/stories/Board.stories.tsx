import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Board from '../../src/components/Board';
import gameReducer from '../../src/store/gameSlice';
import type { Player } from '../../src/models';

const meta = {
    component: Board
} satisfies Meta<typeof Board>;
export default meta;

type Story = StoryObj<typeof Board>;

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

const withSquaredWindow = () => (Story: any) => {
    return (
        <div style={{ position: 'relative', aspectRatio: 1, width: '560px' }}>
            <Story />
        </div>
    );
}

export const DefaultBoard: Story = {
    args: {},
    decorators: [
        withStore({
            game: {
                isNewGame: false,
                isEndGame: false,
                players: [],
                tokens: [],
                playerTurn: undefined,
                playerPlaysAgain: false
            }
        }),
        withSquaredWindow()
    ]
};

export const PlayingBoard: Story = {
    args: {},
    decorators: [
        withStore({
            game: {
                isNewGame: false,
                isEndGame: false,
                players: [
                    { color: 'orange', type: 'Human' },
                    { color: 'purple', type: 'AI' },
                    { color: 'green', type: 'AI' },
                    { color: 'blue', type: 'AI' }
                ] satisfies Player[],
                tokens: [
                    { color: 'orange', tileId: 1 },
                    { color: 'orange', tileId: 30 },
                    { color: 'blue', tileId: 50 }
                ],
                playerTurn: { color: 'orange' },
                playerPlaysAgain: false
            }
        }),
        withSquaredWindow()
    ]
};

export const EndGameBoard: Story = {
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
        }),
        withSquaredWindow()
    ]
};
