import { sleep } from "../../utils/utils";

export class Stack<T> {
    private container: T[] = [];

    push = async (item: T,
        callback: React.Dispatch<React.SetStateAction<T[]>>,
        color:  React.Dispatch<React.SetStateAction<boolean | undefined>>,
        stopCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        processCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        clearCallback: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
        processCallback(true);
        this.container.push(item);
        callback([...this.container]);
        color(true);
        await sleep(500)
        color(false);
        stopCallback(false);
        processCallback(false);
        clearCallback('');
        
    };

    pop = async (callback: React.Dispatch<React.SetStateAction<T[]>>,
        color:  React.Dispatch<React.SetStateAction<boolean | undefined>>,
        stopCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        processCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>): Promise<void> => {
        processCallback(true);
        this.container.pop();
        color(true)
        await sleep(500)
        color(false)
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
