import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { ArrowIcon } from '../../components/ui/icons/arrow-icon'; // стрелочка для перетекания кружочков
import styles from './list.module.css';


export const ListPage: React.FC = () => {
  const [value, setValue] = React.useState('');
  const [inputIdx, setInputIdx] = React.useState<number>();
  const [elements, setElements] = React.useState<Array<number | string>>([]);

  return (
    <SolutionLayout title="Связный список">
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
          <div className={styles.buttonsbox}>
            <Button
              extraClass={styles.buttons}
              text="Добавить в head"
            />
            <Button
              extraClass={styles.buttons}
              text="Добавить в tail"
            />
            <Button
              extraClass={styles.buttons}
              text="Удалить из head"
            />
            <Button
              extraClass={styles.buttons}
              text="Удалить из tail"
            />
          </div>
        </div>
        <div className={styles.mainbox}>
          <Input
            type="text"
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={inputIdx || ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setInputIdx(Number(e.currentTarget.value.replace(/[^0-9]/g, '')))
            }
          />
          <Button
            extraClass={styles.longerbutton}
            text="Добавить по индексу"
          />
          <Button
            extraClass={styles.longerbutton}
            text="Удалить по индексу"
          />
        </div>

      </div>
      <ul className={styles.list}>
        {elements.map((char, idx) => {
          return (
            <div>


            </div>
          )

        })}

      </ul>

    </SolutionLayout>
  );
};
