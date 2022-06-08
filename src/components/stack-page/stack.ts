export class Stack<T> {
    private container: T[] = [];

    push = async (item: T,
        callback: React.Dispatch<React.SetStateAction<T[]>>,
        helper: (key: number) => void, ms: number,
        stopCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        processCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        clearCallback: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
        processCallback(true);
        this.container.push(item);
        callback([...this.container]);
        await helper(ms);
        stopCallback(false);
        processCallback(false);
        clearCallback('');
    };

    pop = async (callback: React.Dispatch<React.SetStateAction<T[]>>,
        helper: (key: number) => void, ms: number,
        stopCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        processCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>): Promise<void> => {
        processCallback(true);
        this.container.pop();
        await helper(ms);
        callback([...this.container]);
        stopCallback(false);
        processCallback(false);
    };

    clear = (callback: React.Dispatch<React.SetStateAction<T[]>>) => {
        this.container = [];
        callback([]);
    }

    getSize = () => this.container.length;
    getElements = () => this.container;
}
