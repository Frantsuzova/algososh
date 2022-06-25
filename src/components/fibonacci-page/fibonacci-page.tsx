import React, { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './fibonacci.module.css';
import { getFibArray } from '../../utils/utils';
import { sleep } from '../../utils/utils';


export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>();
  const [numbersArr, setNumbersArr] = useState<number[]>([]);
  const [inProgress, setInProgress] = useState(false);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(
      Number(e.currentTarget.value.replace(/[^0-9]/g, ''))
    )
  };

  const fiboFunc = async (
    value: any,
    progressSetter: Dispatch<SetStateAction<boolean>>,
    numbersSetter: Dispatch<SetStateAction<number[]>>
  ) => {
    progressSetter(true);
    const fibArray = [...getFibArray(value)];
    const renderFib: number[] = [];
    for (let num of fibArray) {
      renderFib.push(num);
      numbersSetter([...renderFib]);
      await sleep(500);
    }
    progressSetter(false);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    fiboFunc(inputValue, setInputValue, setNumbersArr);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.conteiner}>
        <div className={styles.mainbox}>
          <Input
            placeholder="Введите число от 1 до 19"
            type="number"
            min={1}
            isLimitText={true}
            maxLength={2}
            max={19}
            onChange={handleInputChange}
          />
          <div className={styles.buttonbox}>
            <Button text="Развернуть"
              disabled={inputValue ? inputValue > 19 : true}
              isLoader={inProgress}
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <ul className={styles.list}>
        {numbersArr.map((num, idx) => {
          return <Circle letter={num.toString()} key={idx} index={idx} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
