import { atom } from "recoil";

interface ITodo {
  text: string;
  id: string;
  category: "TODO" | "DOING" | "DONE";
}

export const TodosAtom = atom<ITodo[]>({
  key: "todos",
  default: [],
});
