import { ElementStates } from './element-states';

export type TChar = {
    tail?: string;
    head?: string;
    char?: string;
    state: ElementStates;
};

export interface IColumn {
    number: number;
    state: ElementStates;
}

export interface ICircleElement {
    adding?: boolean;
    deleting?: boolean;
    withoutArrow?: boolean;
    tail?: string;
    head?: string;
    char?: string | null;
    extraCircle?: {
      char: string;
    };
    state: ElementStates;
  }