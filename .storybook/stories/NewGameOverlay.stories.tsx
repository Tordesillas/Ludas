import type { Meta, StoryObj } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NewGameOverlay from '../../src/components/NewGameOverlay';
import gameReducer from "../../src/store/gameSlice";

const meta = {
    component: NewGameOverlay
} satisfies Meta<typeof NewGameOverlay>;
export default meta;

type Story = StoryObj<typeof meta>;

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

export const Default: Story = {
    args: {},
    decorators: [
        withStore({
            game: null
        }),
        (Story) => (
            <div style={{ position: 'relative', aspectRatio: 1 }}>
                <Story />
            </div>
        )
    ]
};
