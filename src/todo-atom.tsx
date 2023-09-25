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
  key: "categories",
  default: "TODO",
});

export const todoSelector = selector<ITodo[][]>({
  key: "todosSelector",
  get: ({ get }) => {
    const todos = get(TodosAtom);
    return ["TODO", "DOING", "DONE"].map((kind) =>
      todos.filter(({ category }) => category === kind)
    );
  },
});
