export class Stack<T> {
    private container: T[] = [];

    push = async (item: T,
        callback: React.Dispatch<React.SetStateAction<T[]>>,
        callback_for_color:  React.Dispatch<React.SetStateAction<boolean | undefined>>,
        helper: (key: number) => void, ms: number,
        
        stopCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        processCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        clearCallback: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
        processCallback(true);
        this.container.push(item);
        callback([...this.container]);
        callback_for_color(true);
        await helper(ms);
        callback_for_color(false);
        stopCallback(false);
        processCallback(false);
        clearCallback('');
        
    };

    pop = async (callback: React.Dispatch<React.SetStateAction<T[]>>,
        callback_for_color:  React.Dispatch<React.SetStateAction<boolean | undefined>>,
        helper: (key: number) => void, ms: number,
        
        stopCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>,
        processCallback: React.Dispatch<React.SetStateAction<boolean | undefined>>): Promise<void> => {
        processCallback(true);
        this.container.pop();
        callback_for_color(true)
        await helper(ms);
        callback_for_color(false)
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
