import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from './sorting.module.css';
import { Column } from "../ui/column/column";
import { sleep, randomNumber } from '../../utils/utils';



//выбор чем сортировать
enum Choice {
  bubble = 'пузырек',
  selectsort = 'выбор'
}

//направление
enum Direction {
  Ascending = "ascending",
  Descending = "descending",
}


export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<number[]>()
  const [funcChoice, setFuncChoice] = React.useState<Choice>()
  const [buttonState, setButtonState] = React.useState<boolean>()
  const [isWorking, setWorkingStatus] = React.useState<boolean>()
  const [isArrayCreated, setArrayStatus] = React.useState<boolean>()
  const [rule, setRule] = React.useState<Direction>()

  const randomArr = (callback: React.Dispatch<React.SetStateAction<number[] | undefined>>) => {
    let size = randomNumber(17, 3) //минимальное количество элементов массива minLen = 3, максимальное maxLen = 17
    let arr = [];
    for (let i = 0; i <= size; i++) {
      arr[i] = randomNumber(0, 100); //массив должен состоять из целых чисел [0; 100]
    }
    callback(arr)
  }

  //выбор




  //пузыречек





  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.conteiner}>
        <div className={styles.radiobox}>
          <RadioInput name='radio' label='Выбор' value='sort' onClick={() => setFuncChoice(Choice.selectsort)} />
          <RadioInput name='radio' label='Пузырек' value='bubble' onClick={() => setFuncChoice(Choice.bubble)} />
        </div>
        <div className={styles.buttonbox}>
          <Button
            text='По возрастанию' sorting={Direction.Ascending}
            extraClass='mr-12'
          />
          <Button
            text='По убыванию'
            extraClass='mr-40'
          />
          <Button disabled={isArrayCreated && funcChoice && buttonState && isWorking}
            text='Новый массив'
            onClick={() => { randomArr(setArray); setArrayStatus(true); }} />
        </div>

      </div>
      <div className={styles.columnList}>
        {array?.map((el, index) => (
          <Column key={index} index={el} />
        ))}
      </div>
    </SolutionLayout>
  );
};
