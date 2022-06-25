import React, { Dispatch, useState, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from './sorting.module.css';
import { Column } from "../ui/column/column";
import { sleep, randomArray, swapElements } from '../../utils/utils';
import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

type TSortingState = {
  isInProсess: boolean;
  isDescending: boolean;
  isAscending: boolean;
};

interface IColumn {
  number: number;
  state: ElementStates;
}


export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<Array<IColumn>>([]);
  const [sortingType, setSortingType] = useState<string>("selection");
  const [inProсess, setInProсess] = useState(false);
  const [statesSort, setStatesSort] = useState<TSortingState>({
    isInProсess: false,
    isDescending: false,
    isAscending: false
  });
  /*
  const [isArrayCreated, setArrayStatus] = React.useState<boolean>();
  const [buttonState, setButtonState] = React.useState<boolean>();
  */


  const generateArray = () => {
    setArray([...randomArray(3, 17, 100)]);
  };


  const bubbleSorting = async (
    sortingOption: "ascending" | "descending",
    initialArr: IColumn[],
    initialArrSetter: Dispatch<SetStateAction<IColumn[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    sortingOption === "ascending"
      ? setStatesSort({ ...statesSort, isAscending: true })
      : setStatesSort({ ...statesSort, isDescending: true });
    processSetter(true);

    const arr = [...initialArr];
    arr.forEach((el) => (el.state = ElementStates.Default));

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        initialArrSetter([...arr]);
        await sleep(500);

        if (
          (sortingOption === "ascending" ? arr[j].number : arr[j + 1].number) >
          (sortingOption === "ascending" ? arr[j + 1].number : arr[j].number)
        ) {
          swapElements(arr, j, j + 1);
          initialArrSetter([...arr]);
          await sleep(500);
        }
        arr[j].state = ElementStates.Default;
        arr[j + 1].state = ElementStates.Default;
        if (j === arr.length - i - 2) {
          arr[j + 1].state = ElementStates.Modified;
        }
        initialArrSetter([...arr]);
        await sleep(500);
      }
    }
    arr.forEach((el) => (el.state = ElementStates.Modified));
    processSetter(false);
    sortingOption === "ascending"
      ? setStatesSort({ ...statesSort, isAscending: false })
      : setStatesSort({ ...statesSort, isDescending: false });
  };

  const selectionSorting = async (
    sortingOption: "ascending" | "descending",
    initialArr: IColumn[],
    initialArrSetter: Dispatch<SetStateAction<IColumn[]>>,
    processSetter: Dispatch<SetStateAction<boolean>>
  ) => {
    sortingOption === "ascending"
      ? setStatesSort({ ...statesSort, isAscending: true })
      : setStatesSort({ ...statesSort, isDescending: true });
    processSetter(true);
    const arr = [...initialArr];
    arr.forEach((el) => (el.state = ElementStates.Default));

    for (let i = 0; i < arr.length - 1; i++) {
      let swapInd = i;
      arr[swapInd].state = ElementStates.Changing;

      for (let j = i + 1; j < arr.length; j++) {
        arr[j].state = ElementStates.Changing;
        initialArrSetter([...arr]);
        await sleep(500);
        if (
          (sortingOption === "ascending"
            ? arr[swapInd].number
            : arr[j].number) >
          (sortingOption === "ascending" ? arr[j].number : arr[swapInd].number)
        ) {
          arr[swapInd].state =
            i === swapInd ? ElementStates.Changing : ElementStates.Default;
          swapInd = j;
          initialArrSetter([...arr]);
          await sleep(500);
        }
        if (j !== swapInd) {
          arr[j].state = ElementStates.Default;
          initialArrSetter([...arr]);
          await sleep(500);
        }
      }
      if (i === swapInd) {
        arr[i].state = ElementStates.Modified;
        initialArrSetter([...arr]);
        await sleep(500);
      } else {
        swapElements(arr, swapInd, i);
        arr[i].state = ElementStates.Modified;
        initialArrSetter([...arr]);
        await sleep(500);
        arr[swapInd].state = ElementStates.Default;
        initialArrSetter([...arr]);
        await sleep(500);
      }
    }
    arr.forEach((el) => (el.state = ElementStates.Modified));
    processSetter(false);
    sortingOption === "ascending"
      ? setStatesSort({ ...statesSort, isAscending: false })
      : setStatesSort({ ...statesSort, isDescending: false });
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.conteiner}>
        <div className={styles.radiobox}>
          <RadioInput
            label="Выбор"
            value="selection"
            onChange={() => setSortingType("selection")}
            checked={sortingType === "selection"}
          />
          <RadioInput
            label="Пузырёк"
            value="bubble"
            onChange={() => setSortingType("bubble")}
            checked={sortingType === "bubble"}
          />
        </div>
        <div className={styles.buttonbox}>
          <Button type="submit" text="По возрастанию" extraClass='mr-12' sorting={Direction.Ascending}
            onClick={() =>
              sortingType === "selection"
                ? selectionSorting(
                  "ascending",
                  array,
                  setArray,
                  setInProсess
                )
                : bubbleSorting(
                  "ascending",
                  array,
                  setArray,
                  setInProсess
                )}
            isLoader={statesSort.isAscending}
            disabled={statesSort.isDescending}

          />
          <Button type="submit" text="По убыванию" extraClass='mr-40'
            onClick={() =>
              sortingType === "selection"
                ? selectionSorting(
                  "descending",
                  array,
                  setArray,
                  setInProсess
                )
                : bubbleSorting(
                  "descending",
                  array,
                  setArray,
                  setInProсess
                )
            }
            isLoader={statesSort.isDescending}
            disabled={statesSort.isAscending}
          />
          <Button disabled={inProсess}
            text='Новый массив'
            onClick={() => { generateArray() }} />
        </div>

      </div>
      <div className={styles.columnList}>
        {array?.map((el, index) => {
          return (
            <li key={index}>
              <Column index={el.number} state={el.state} />
            </li>
          );
        })}

      </div>
    </SolutionLayout>
  );
};
