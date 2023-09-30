import { atom, selector, selectorFamily } from "recoil";

export interface IBar {
  id: number;
  text: string;
}

export interface ILists {
  [key: string]: IBar[];
}

export interface IBoard {
  [key: string]: ILists[];
}

export const dataState = atom<IBoard[]>({
  key: "datas",
  default: [
    {
      오늘: [
        { TODO: [{ id: 1, text: "코딩" }] },
        {
          DOING: [
            { id: 11, text: "잠자기" },
            { id: 21, text: "게임하기" },
          ],
        },
        {
          DONE: [
            { id: 111, text: "샤워하기" },
            { id: 211, text: "밥먹기" },
          ],
        },
      ],
    },
    {
      내일: [
        { TODO: [{ id: 2, text: "코딩" }] },
        {
          DOING: [
            { id: 21, text: "잠자기" },
            { id: 22, text: "게임하기" },
          ],
        },
        {
          DONE: [
            { id: 221, text: "샤워하기" },
            { id: 222, text: "밥먹기" },
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
    return data.map((board) => Object.keys(board)[0]);
  },
});

export const listsSelector = selectorFamily<
  ILists[],
  { boardIndex: number; boardName: string }
>({
  key: "lists",
  get:
    ({ boardIndex, boardName }) =>
    ({ get }) => {
      const data = get(dataState);
      return data[boardIndex][boardName];
    },
});
