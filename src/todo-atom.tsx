import { atom } from "recoil";
import { selector } from "recoil";
interface ITodo {
  text: string;
  id: string;
  category: "TODO" | "DOING" | "DONE";
}

export const TodosAtom = atom<ITodo[]>({
  key: "todos",
  default: [],
});

export const CategoriesAtom = atom<ITodo["category"]>({
  key: "category",
  default: "TODO",
});

export const todoSelector = selector<ITodo[]>({
  key: "todosSelector",
  get: ({ get }) => {
    const todos = get(TodosAtom);
    const category = get(CategoriesAtom);
    return todos.filter((toDo) => toDo.category === category);
  },
});

export const enum CATEGORIES {
  "TODO" = "TODO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
