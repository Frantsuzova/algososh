export const getFibonacciNumbers = (n: number | string): number[] => {
    let arr: number[] = [1, 1];
    for (let i = 2; i < Number(n) + 1; i++) {
        arr.push(arr[i - 2] + arr[i - 1]);
    }
    return arr;
};

export const valueCheck = (
    value: number | string,
    callback: (key: boolean) => void
) => {
    if (
        value < 1 ||
        value > 19 ||
        String(value).indexOf("0") === 0 ||
        value === undefined
    ) {
        callback(true);
    } else callback(false);
};

export const indexCheck = (index: number, currIndex: number): boolean => {
    if (currIndex === index || currIndex > index) {
        return true;
    } else return false;
};