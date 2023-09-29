import { atom } from "recoil";

export interface IBar {
  id: string;
  text: string;
}

export const boardsState = atom<string[]>({
  key: "boards",
  default: ["yesterday", "tomorrow"],
});

export const listsState = atom<{ [key: string]: string[] }>({
  key: "lists",
  default: { yesterday: ["TODO", "DONE"], tomorrow: ["TODO", "DONE"] },
});

export const valuesState = atom<{ [key: string]: IBar[] }>({
  key: "values",
  default: {
    TODO: [
      {
        id: "1",
        text: "hello",
      },
      {
        id: "2",
        text: "zitto",
      },
      {
        id: "3",
        text: "hello",
      },
    ],
    DONE: [
      {
        id: "2",
        text: "wake up",
      },
    ],
  },
});
