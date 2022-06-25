import React, { useState,useMemo ,FormEvent, } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import styles from './queue.module.css';
import Queue from './queue';
import { ElementStates } from "../../types/element-states";
import { ICircleElement } from "../../types/types";
import { sleep } from "../../utils/utils";


export const QueuePage: React.FC = () => {
  const maxRenderArrLength = 7;

  const initialArrState: ICircleElement[] = Array.from(
    { length: maxRenderArrLength },
    () => ({ char: "", state: ElementStates.Default })
  );

  const [value, setValue] = useState<string>("");
  const [elements, setElementsArr] =
    useState<ICircleElement[]>(initialArrState);
  const [addStatus, setIsAdding] = useState(false);
  const [deleteStatus, setIsDeleting] = useState(false);

  const queue = useMemo(() => new Queue<string>(maxRenderArrLength), []);

  const clear = () => {
    queue.clear();
    setElementsArr([...initialArrState]);
  };

  const enqueue = async () => {
    setIsAdding(true);
    queue.enqueue(value);
    setValue("");
    const head = queue.getHead();
    const tail = queue.getTail();
    elements[head.index].char = head.value; //голова
    elements[head.index].head = "head";
    if (tail.index > 0) elements[tail.index - 1].tail = "";
    elements[tail.index].char = tail.value; //хвост
    elements[tail.index].tail = "tail";
    elements[tail.index].state = ElementStates.Changing;
    await sleep(500);
    elements[tail.index].state = ElementStates.Default;
    setIsAdding(false);
  };

  const dequeue = async () => {
    setIsDeleting(true);
    const head = queue.getHead();
    const tail = queue.getTail();
    if (head.index === tail.index) {
      clear();
    } else {
      queue.dequeue();
      const head = queue.getHead();
      elements[head.index - 1].state = ElementStates.Changing;
      await sleep(500);
      elements[head.index - 1].state = ElementStates.Default;
      if (head.index > 0) {
        elements[head.index - 1].head = "";
        elements[head.index - 1].char = "";
      }
      elements[head.index].head = "head";
      elements[head.index].char = head.value;
    }

    setIsDeleting(false);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    
    enqueue();
    
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.conteiner}>
        <div className={styles.mainbox} >
      
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            min={1}
            value={value || ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setValue(e.currentTarget.value) }
            isLimitText={true}
            maxLength={4}
            disabled={addStatus || deleteStatus}
          />
          <Button
            isLoader={addStatus}
            text="Добавить"
            type="submit"
            disabled={ !value || elements[elements.length - 1].char !== '' || deleteStatus}
            onClick={handleClick}
          />
          <Button
            extraClass={styles.deletebutton}
            isLoader={deleteStatus}
            text="Удалить"
            onClick={() => dequeue()}
            disabled={addStatus}
            
          />
          <Button
            text="Очистить"
            onClick={() => clear()}
          />
          
        </div>
      </div>
     
      <ul className={styles.list}>
      {elements.map((char:any, idx) => {
          return (
            <Circle
              state={char.state}
              letter={char.char}
              index={idx}
              key={idx}
              head={char.head}
              tail={char.tail}
            />
          );
        })}
      </ul>

    </SolutionLayout>
  );
};
