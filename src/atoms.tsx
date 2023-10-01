import { atom, selector, selectorFamily } from "recoil";

export interface IBar {
  id: number;
  text: string;
}

export interface ILists {
  name: string;
  id: number;
  bars: IBar[];
}

export interface IBoard {
  name: string;
  id: number;
  lists: ILists[];
}

export const dataState = atom<IBoard[]>({
  key: "datas",
  default: [
    {
      name: `내일`,
      id: 2312315,
      lists: [
        { name: "TODO", id: 1234567, bars: [{ id: 1, text: "코딩" }] },
        {
          name: "DOING",
          id: 2345678,
          bars: [
            { id: 11, text: "잠자기" },
            { id: 21, text: "게임하기" },
          ],
        },
        {
          name: "DONE",
          id: 3456789,
          bars: [
            { id: 111, text: "샤워하기" },
            { id: 211, text: "밥먹기" },
          ],
        },
      ],
    },
    {
      name: `${new Date().getMonth() + 1} 월 ${new Date().getDate()}일`,
      id: 1235904924,
      lists: [
        { name: "TODO", id: 9876543, bars: [{ id: 1, text: "코딩" }] },
        {
          name: "DOING",
          id: 1232135,
          bars: [
            { id: 1122, text: "잠자기" },
            { id: 21222, text: "게임하기" },
          ],
        },
        {
          name: "DONE",
          id: 12399224,
          bars: [
            { id: 11133, text: "샤워하기" },
            { id: 21144, text: "밥먹기" },
          ],
        },
      ],
    },
  ],
});

export const boardsSelector = selector({
  key: "boards",
  get: ({ get }) => {
    const data = get(dataState);
    return data;
  },
});

export const boardSelector = selectorFamily<IBoard, { boardIndex: number }>({
  key: "board",
  get:
    ({ boardIndex }) =>
    ({ get }) => {
      const data = get(dataState);
      return data[boardIndex];
    },
});

export const boardNameSelector = selectorFamily<string, { boardIndex: number }>(
  {
    key: "boardName",
    get:
      ({ boardIndex }) =>
      ({ get }) => {
        const data = get(dataState);
        return data[boardIndex].name;
      },
    set:
      ({ boardIndex }) =>
      ({ set }, newName) => {
        set(dataState, (oldData) => {
          const newData = JSON.parse(JSON.stringify(oldData));
          newData[boardIndex].name = newName;
          saveDatas(newData);
          return newData;
        });
      },
  }
);

export const listsSelector = selectorFamily<
  ILists[] | number,
  { boardIndex: number }
>({
  key: "lists",
  get:
    ({ boardIndex }) =>
    ({ get }): ILists[] => {
      const data = get(dataState);
      return data[boardIndex]["lists"];
    },
  set:
    ({ boardIndex }) =>
    ({ set }, targetIndex) => {
      set(dataState, (oldData) => {
        const newData = JSON.parse(JSON.stringify(oldData));
        newData[boardIndex].lists.splice(targetIndex, 1);
        saveDatas(newData);
        return newData;
      });
    },
});

export const ListNameSelector = selectorFamily<
  string,
  { boardIndex: number; listIndex: number }
>({
  key: "list-name",
  get:
    ({ boardIndex, listIndex }) =>
    ({ get }) => {
      const data = get(dataState);
      return data[boardIndex].lists[listIndex].name;
    },
  set:
    ({ boardIndex, listIndex }) =>
    ({ set }, newName) => {
      set(dataState, (oldData) => {
        const newData = JSON.parse(JSON.stringify(oldData));
        newData[boardIndex].lists[listIndex].name = newName;
        saveDatas(newData);
        return newData;
      });
    },
});

export const barsSelector = selectorFamily<
  ILists["bars"] | number,
  { boardIndex: number; listIndex: number }
>({
  key: "list",
  get:
    ({ boardIndex, listIndex }) =>
    ({ get }) => {
      const data = get(dataState);
      return data[boardIndex].lists[listIndex].bars;
    },
  set:
    ({ boardIndex, listIndex }) =>
    ({ set }, targetIndex) => {
      set(dataState, (data) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData[boardIndex].lists[listIndex].bars.splice(targetIndex, 1);
        saveDatas(newData);
        return newData;
      });
    },
});

export const barTextSelector = selectorFamily<
  string,
  { boardIndex: number; listIndex: number; barIndex: number }
>({
  key: "bar",
  get:
    ({ boardIndex, listIndex, barIndex }) =>
    ({ get }) => {
      const data = get(dataState);
      const barText = data[boardIndex].lists[listIndex].bars[barIndex].text;
      return barText;
    },
  set:
    ({ boardIndex, listIndex, barIndex }) =>
    ({ set }, newText) => {
      set(dataState, (data) => {
        const newData = JSON.parse(JSON.stringify(data));
        newData[boardIndex].lists[listIndex].bars[barIndex].text = newText;
        saveDatas(newData);
        return newData;
      });
    },
});
export const loadDatas = (): IBoard[] | null => {
  const dataString = localStorage.getItem("datas") || "null";
  const datas = JSON.parse(dataString);
  return datas;
};

export const saveDatas = (datas: IBoard[]) => {
  localStorage.setItem("datas", JSON.stringify(datas));
};
