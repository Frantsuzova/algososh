import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { Stack } from "./stack";
import { Circle } from '../../components/ui/circle/circle';
import styles from './stack.module.css';
import { ElementStates } from "../../types/element-states";

const stack = new Stack<number | string>();

const findHead = (currentCount: number, index: number,) => {
  if (currentCount === index + 1) {
    return 'top'
  }
}

const setColor = (currentCount: number, index: number, deleteStatus: boolean, isChange:boolean) => {
  if ((findHead(currentCount, index,) === 'top' && isChange) && !deleteStatus) {
    return ElementStates.Changing
  } else if ((findHead(currentCount, index - 1,) === 'top' && isChange) && deleteStatus) {
    return ElementStates.Changing
  }
  return ElementStates.Default
}

export const StackPage: React.FC = () => {

  const [value, setValue] = React.useState('');
  const [elements, setElements] = React.useState<Array<number | string>>([]);
  const [currentCount, setCurrentCount] = React.useState<number>(0);
  const [addStatus, setAddStatus] = React.useState<boolean>();
  const [deleteStatus, setDeleteStatus] = React.useState<boolean>();
  const [inProcess, setProcess] = React.useState<boolean>();
  const [isChange, setChangeStatus] = React.useState<boolean>();


  return (
    <SolutionLayout title="Стек">
      <div className={styles.conteiner}>
        <div className={styles.mainbox}>
          <Input
            value={value}
            maxLength={4}
            isLimitText={true}
            onChange={(e) => setValue(e.currentTarget.value)} />
          <Button
            disabled={inProcess || value.length === 0 || elements.length > 9}
            isLoader={addStatus}
            text='Добавить'
            onClick={() => {
              stack.push(value, setElements, setChangeStatus, setAddStatus, setProcess, setValue);

              setCurrentCount(currentCount + 1); setAddStatus(true)
            }} />
          <Button
            disabled={inProcess || elements.length === 0}
            isLoader={deleteStatus}
            text='Удалить'
            extraClass={styles.deletebutton}
            onClick={() => {
              stack.pop(setElements, setChangeStatus, setDeleteStatus, setProcess); setCurrentCount(currentCount - 1);

              setDeleteStatus(true)
            }} />
          <Button
            disabled={inProcess || elements.length === 0}
            text='Очистить'
            onClick={() => {
              stack.clear(setElements);
              setCurrentCount(0)
            }} />
        </div>
      </div>
      <ul className={styles.list}>
        {elements.map((char: number | string, idx: number) => {
          return <Circle
            key={idx}
            letter={`${char}`}
            head={!deleteStatus ? findHead(currentCount, idx) : findHead(currentCount, idx - 1)}
            state={setColor(currentCount, idx,deleteStatus!,isChange!)}
            index={idx} />;

        })}
      </ul>
    </SolutionLayout>
  );
};
