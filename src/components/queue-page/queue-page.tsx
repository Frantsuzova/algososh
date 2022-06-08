import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import styles from './queue.module.css';


export const QueuePage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [addStatus, setAddStatus] = React.useState<boolean>();
  const [deleteStatus, setDeleteStatus] = React.useState<boolean>();
  const [elements, setElements] = React.useState<Array<number | string>>([]);

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.conteiner}>
        <div className={styles.mainbox}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            min={1}
            value={value || ''}
            onChange={(e) => setValue(e.currentTarget.value)}
            isLimitText={true}
            maxLength={4}
          />
          <Button
            isLoader={addStatus}
            text="Добавить"
            type="submit"
          />
          <Button
            extraClass={styles.deletebutton}
            isLoader={deleteStatus}
            text="Удалить"
          />
          <Button
            text="Очистить"
          />
        </div>
      </div>
      <ul className={styles.list}>
        {elements.map((char, idx) => {
          return (
            <Circle
              letter={`${char}`}
              index={idx}
              key={idx}
            //head={}
            //tail={}
            />
          );
        })}
      </ul>

    </SolutionLayout>
  );
};
