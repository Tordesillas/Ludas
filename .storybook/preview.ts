import type { Preview } from '@storybook/react-vite';
import {sb} from "storybook/test";
import '../src/assets/main.css';

sb.mock(import('../src/services/SequencerService.ts'));

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        }
    }
};

export default preview;
