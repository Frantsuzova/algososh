import { TChar } from '../types/types';
import { ElementStates } from "../types/element-states";

export const randomArray = (min: number, max: number, maxelement: number) => {
    const length = Math.floor(Math.random() * (max - min) + min);
    let arr = [];
    for (let i = 0; i <= length; i++) {
        arr.push({
            number: Math.floor(Math.random() * (maxelement + 1)),
            state: ElementStates.Default,
        });
    }
    return arr;
};

export const getFibArray = (n: number): number[] => {
    let arr: number[] = [0, 1];
    for (let i = 2; i <= n + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr.slice(1);
};
/******************swap************************ */
export const swapElements = (
    arr: TChar[],
    firstIndex: number,
    secondIndex: number
): void => {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
};

/*****************delay************************ */
export const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
