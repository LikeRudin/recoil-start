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
      name: "오늘",
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
      name: "내일",
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
    return data.map((board) => board["name"]);
  },
});

export const listsSelector = selectorFamily<ILists[], { boardIndex: number }>({
  key: "lists",
  get:
    ({ boardIndex }) =>
    ({ get }) => {
      const data = get(dataState);
      return data[boardIndex]["lists"];
    },
});
