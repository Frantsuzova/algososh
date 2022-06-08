import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from './string.module.css';
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { swapElements } from '../../utils/utils';
import { sleep } from '../../utils/utils';
import { TChar } from '../../types/types';


export const StringComponent: React.FC = () => {

  const [inputValue, setInputCharArr] = useState('');
  const [lettersArr, setLettersArr] = useState<TChar[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputCharArr(e.currentTarget.value);
  };

  const swapChars = async (
    value: string,
    valueSetter: Dispatch<SetStateAction<string>>,
    lettersSetter: Dispatch<SetStateAction<TChar[]>>,
    progressSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    valueSetter('');
    progressSetter(true);
    const charsArr: TChar[] = [];
    value.split('').forEach(el => {
      charsArr.push({ char: el, state: ElementStates.Default });
    });
    lettersSetter([...charsArr]);
    await sleep(1000);
    for (let arr = charsArr, start = 0, end = arr.length - 1; end >= start; start++, end--) {
      if (end === start) {
        charsArr[start].state = ElementStates.Modified;
        lettersSetter([...charsArr]);
        await sleep(1000);
        progressSetter(false);
      }
      else {
        charsArr[start].state = ElementStates.Changing;
        charsArr[end].state = ElementStates.Changing;
        lettersSetter([...charsArr]);
        await sleep(1000);
        swapElements(charsArr, start, end);
        charsArr[start].state = ElementStates.Modified;
        charsArr[end].state = ElementStates.Modified;
        lettersSetter([...charsArr]);
        await sleep(1000);
      }
    }
    progressSetter(false);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    swapChars(inputValue, setInputCharArr, setLettersArr, setInProgress);
  };


  return (
    <SolutionLayout title="Строка">
      <div className={styles.conteiner}>
        <div className={styles.mainbox}>
          <Input
            isLimitText={true}
            maxLength={11}
            onChange={handleInputChange} />
          <div className={styles.buttonbox}>
            <Button text="Развернуть"
              onClick={handleClick}
              disabled={!inputValue}
            />
          </div>
        </div>
      </div>
      <ul className={styles.list}>
        {lettersArr.map((char, idx) => {
          return <Circle state={char.state} letter={char.char} key={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
