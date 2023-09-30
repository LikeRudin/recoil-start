import { atom } from "recoil";

interface IBar {
  text: string;
  id: number;
}
interface IListState {
  [key: string]: IBar[];
}

export const listState = atom<IListState>({
  key: "lists",
  default: {
    TODO: [{ id: 1, text: "코딩" }],
    DOING: [
      { id: 1, text: "잠자기" },
      { id: 2, text: "게임하기" },
    ],
    DONE: [
      { id: 1, text: "샤워하기" },
      { id: 2, text: "밥먹기" },
    ],
  },
});

interface IBoardState {
  [key: string]: string[];
}

export const boardState = atom<IBoardState>({
  key: "boards",
  default: {
    오늘: ["TODO", "DOING", "DONE"],
    내일: ["TODO", "DOING", "DONE"],
  },
});
