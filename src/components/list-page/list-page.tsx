import React, { useEffect, useMemo, useState }  from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../../components/ui/input/input';
import { Button } from '../../components/ui/button/button';
import { Circle } from '../../components/ui/circle/circle';
import { ArrowIcon } from '../../components/ui/icons/arrow-icon'; // стрелочка для перетекания кружочков
import styles from './list.module.css';
import { sleep } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { ICircleElement } from "../../types/types";
import {LinkedList} from "./list";


type TLinkedListElementState = {
  isAddingToTheTail: boolean;
  isAddingToTheHead: boolean;
  isRemovingFromTheHead: boolean;
  isRemovingFromTheTail: boolean;
  isAddingByIndex: boolean;
  isRemovingByIndex: boolean;
};

const getRandomChar = () => {
  const charString = "0123456789abcdefghigklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * charString.length);
  const char = charString[randomIndex];
  return char;
};

export const ListPage: React.FC = () => {
  const maxListLength = 12;
  const minListLength = 6;
  const [value, setInputValue] = useState<string>("");
  const [inputIdxValue, setInputIdxValue] = useState<number>();
  const [elements, setElements] = useState<ICircleElement[]>([]);
  const [states, setStates] = useState<TLinkedListElementState>({
    isAddingToTheTail: false,
    isAddingToTheHead: false,
    isRemovingFromTheHead: false,
    isRemovingFromTheTail: false,
    isAddingByIndex: false,
    isRemovingByIndex: false,
  });
  const inProcess = useMemo<boolean>(() => !!Object.values(states).find((el) => el),[states]);

  // начальное состояние
  const initialArrLook = useMemo(
    () => Array.from({ length: minListLength }, () => `${getRandomChar()}`),
    []
  );
  // state
  const initialArrState: ICircleElement[] = useMemo(() => [], []);
  const linkedList = useMemo(
    () => new LinkedList<string>(initialArrLook),
    [initialArrLook]
  );

  useEffect(() => {
    initialArrLook.forEach((el) => {
      initialArrState.push({
        char: el,
        state: ElementStates.Default,
      });
    });
    setElements(initialArrState.reverse());
  }, [initialArrLook, initialArrState]);


  const addToTheHead = async () => {
    setStates({ ...states, isAddingToTheHead: true });
    const arr = [...elements];
    linkedList.prepend(value);
    arr[0] = {
      ...arr[0],
      adding: true,
      extraCircle: {
        char: linkedList.getNodeByIndex(0) || '',
      },
    };
    setElements([...arr]);
    await sleep(500);
    arr[0] = {
      ...arr[0],
      adding: false,
      extraCircle: undefined,
    };
    arr.unshift({
      char: linkedList.getNodeByIndex(0) || '',
      state: ElementStates.Modified,
    });
    setElements([...arr]);
    await sleep(500);
    arr[0].state = ElementStates.Default;
    setStates({ ...states, isAddingToTheHead: false });
    setInputValue("");
  };


  const addToTheTail = async () => {
    setStates({ ...states, isAddingToTheTail: true });
    const arr = [...elements];
    linkedList.append(value);
    const newTailIndex = linkedList.sizeList - 1;
    for (let i = 0; i <= newTailIndex; i++) {
      arr[i] = {
        ...arr[i],
        adding: true,
        extraCircle: {
          char: linkedList.getNodeByIndex(newTailIndex) || '',
        },
      };
      if (i > 0) {
        arr[i - 1] = {
          ...arr[i - 1],
          adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      }
      setElements([...arr]);
      await sleep(500);
    }
    arr[arr.length - 1] = {
      ...arr[arr.length],
      char: linkedList.getNodeByIndex(newTailIndex) || "",
      state: ElementStates.Modified,
      adding: false,
      extraCircle: undefined,
    };
    setElements([...arr]);
    await sleep(500);
    arr.forEach((el) => (el.state = ElementStates.Default));
    setStates({ ...states, isAddingToTheTail: false });
    setInputValue("");
  };


  const removeFromTheHead = async () => {
    setStates({ ...states, isRemovingFromTheHead: true });
    const arr = [...elements];
    arr[0] = {
      ...arr[0],
      char: "",
      deleting: true,
      extraCircle: { char: linkedList.deleteHead() || ''},
    };
    setElements([...arr]);
    await sleep(500);
    arr.shift(); //del first el
    arr[0].state = ElementStates.Modified;
    setElements([...arr]);
    await sleep(500);
    arr[0].state = ElementStates.Default;
    setStates({ ...states, isRemovingFromTheHead: false });
    setInputValue("");
  };


  const removeFromTheTail = async () => {
    setStates({ ...states, isRemovingFromTheTail: true });
    const arr = [...elements];
    const { length } = arr;
    arr[length - 1] = {...arr[length - 1],char: '',deleting: true,
      extraCircle: {
        char: linkedList.deleteTail() || '',
      },
    };
    setElements([...arr]);
    await sleep(500);
    arr.pop(); //del last
    arr[length - 2].state = ElementStates.Modified;
    setElements([...arr]);
    await sleep(500);
    arr[length - 2].state = ElementStates.Default;
    setStates({ ...states, isRemovingFromTheTail: false });
    setInputValue("");
  };


  const addByIndex = async (index: number) => {
    setStates({ ...states, isAddingByIndex: true });
    const arr = [...elements];
    linkedList.addByIndex(value, index);
    for (let i = 0; i <= index; i++) {
      arr[i] = {...arr[i], adding: true,
        extraCircle: {
          char: linkedList.getNodeByIndex(index) || '',
        },
      };
      if (i > 0) {
        arr[i - 1] = {...arr[i - 1], adding: false,
          extraCircle: undefined,
          state: ElementStates.Changing,
        };
      }
      setElements([...arr]);
      await sleep(500);
    }
    arr[index] = {...arr[index], adding: false,
      extraCircle: undefined,
    };
    arr.splice(index, 0, {
      char: linkedList.getNodeByIndex(index) || '',
      state: ElementStates.Modified,
    });
    setElements([...arr]);
    await sleep(500);
    arr.forEach((el) => (el.state = ElementStates.Default));

    

    setStates({ ...states, isAddingByIndex: false });
    setInputValue("");
    setInputIdxValue(undefined);
  };




  const removeByIndex = async (index: number) => {
    setStates({ ...states, isRemovingByIndex: true });
    const arr = [...elements];
    for (let i = 0; i <= index; i++) {
      arr[i].state = ElementStates.Changing;
      if (i === index) {
        arr[i].withoutArrow = true;
      }
      setElements([...arr]);
      await sleep(500);
    }
    arr[index] = {...arr[index], char: '', deleting: true,
      extraCircle: {
        char: linkedList.deleteByIndex(index) || '',
      },
    };
    setElements([...arr]);
    await sleep(500);
    arr.splice(index, 1);
    setElements([...arr]);
    await sleep(500);
    arr.forEach((el) => (el.state = ElementStates.Default));

    

    setStates({ ...states, isRemovingByIndex: false });
    setInputValue('');
    setInputIdxValue(undefined);
  };

  

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.conteiner}>
        <div className={styles.mainbox}>
          <Input
            extraClass={styles.input}
            placeholder="Введите значение"
            min={1}
            value={value || ''}
            onChange={(e: React.FormEvent<HTMLInputElement>) => { setInputValue(e.currentTarget.value)}}
            isLimitText={true}
            maxLength={4}
          />
          <div className={styles.buttonsbox}>
            <Button
              extraClass={styles.buttons}
              text="Добавить в head"
              type="button"
              onClick={() => addToTheHead()}
              disabled={!value || inProcess || elements.length > maxListLength }
              isLoader={states.isAddingToTheHead}
            />
            <Button
              extraClass={styles.buttons}
              text="Добавить в tail"
              type="button"
              onClick={() => addToTheTail()}
              disabled={!value || inProcess}
              isLoader={states.isAddingToTheTail}
            />
            <Button
              extraClass={styles.buttons}
              text="Удалить из head"
              type="button"
              onClick={() => removeFromTheHead()}
              disabled={inProcess || elements.length === 1}
              isLoader={states.isRemovingFromTheHead}
            />
            <Button
              extraClass={styles.buttons}
              text="Удалить из tail"
              type="button"
              onClick={() => removeFromTheTail()}
              disabled={inProcess || elements.length === 1}
              isLoader={states.isRemovingFromTheTail}
            />
          </div>
        </div>
        <div className={styles.mainbox}>
          <Input
            type="text"
            extraClass={styles.input}
            placeholder="Введите индекс"
            maxLength={1}
            value={inputIdxValue || ""}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setInputIdxValue(Number(e.currentTarget.value))}
          />
          <Button
            extraClass={styles.longerbutton}
            text="Добавить по индексу"
            type="button"
            onClick={() => inputIdxValue && addByIndex(inputIdxValue)}
            disabled={!value || !inputIdxValue || inProcess || inputIdxValue > elements.length - 1 || elements.length > maxListLength}
            isLoader={states.isAddingByIndex}
          />
          <Button
            extraClass={styles.longerbutton}
            text="Удалить по индексу"
            type="button"
            onClick={() => inputIdxValue && removeByIndex(inputIdxValue)}
            disabled={!inputIdxValue || inProcess || inputIdxValue > elements.length - 1 || elements.length === 1}
            isLoader={states.isRemovingByIndex}
          />
        </div>
      </div>
      <ul className={styles.list}>
      {elements.map((char:any, index) => {
          return (
            <li key={index} className={styles.ellist}>
              <Circle
                letter={char.char}
                state={char.state}
                index={index}
                head={
                  index === 0 && !char.adding && !char.deleting ? "head" : ""
                }
                tail={
                  index === elements.length - 1 &&
                  !char.adding &&
                  !char.deleting
                    ? "tail"
                    : ""
                }
              />
              {index !== elements.length - 1 && (
                <ArrowIcon
                  fill={
                    char.state === ElementStates.Changing && !char.withoutArrow
                      ? "#d252e1"
                      : "#0032FF"
                  }
                />
              )}
              {char.adding && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  extraClass={styles.firstcirlce}
                />
              )}
              {char.deleting && (
                <Circle
                  isSmall={true}
                  state={ElementStates.Changing}
                  letter={char.extraCircle?.char}
                  extraClass={styles.secondcircle}
                />
              )}
            </li>
          );
        })}
      </ul>

    </SolutionLayout>
  );
};
