import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, mocked } from 'storybook/test';
import TokenTile from '../../src/components/TokenTile';
import { moveToken } from '../../src/services/SequencerService.ts';

const meta = {
    component: TokenTile,
    args: {
        index: 0
    },
    beforeEach: async () => {
        mocked(moveToken).mockImplementation(fn())
    }
} satisfies Meta<typeof TokenTile>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Orange: Story = {
    args: {
        token: {color: "orange", tileId: 10},
        floor: 0
    }
};

export const PurpleActive: Story = {
    args: {
        token: {color: "purple", tileId: 10, isInteractive: true},
        floor: 0
    }
};