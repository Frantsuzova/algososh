import { ElementStates } from './element-states';

export type TChar = {
    tail?: string;
    head?: string;
    char?: string;
    state: ElementStates;
};