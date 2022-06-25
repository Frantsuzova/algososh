export default class Queue<T> {
  private container: (T | null)[] = [];
  head: any= 0;
  tail: any = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue(item: T) {
    if (this.length >= this.size) {
      throw new Error('превышена длинна');
    }
    this.container[this.tail] = item;
    this.tail++;
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('нет элементов');
    }
    this.container[this.head] = null;
    this.head++;
    this.length--;
  }

  getHead = (): {value: T | null; index: number} => {
    if (this.isEmpty()) {
      throw new Error('нет элементов');
    }
    return {value: this.container[this.head], index: this.head};
  };

  getTail = (): {value: T | null; index: number} => {
    if (this.isEmpty()) {
      throw new Error('нет элементов');
    }
    return {value: this.container[this.tail - 1], index: this.tail - 1};
  };

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  isEmpty = () => this.length === 0;
}