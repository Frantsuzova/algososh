import { TChar } from '../types/types';

export const randomNumber = (min: number, max: number): number => {
    const offset = min;
    const range = (max - min) + 1;
    return Math.floor(Math.random() * range) + offset;
}

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
