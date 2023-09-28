import { atom } from "recoil";
import { selector } from "recoil";
export interface ITodo {
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

export const boardListState = atom<string[]>({
  key: "boardList",
  default: ["TODO"],
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

export const loadTodos = (): ITodo[] | null => {
  const todosString = localStorage.getItem("todos") || "null";
  const todos = JSON.parse(todosString);
  return todos;
};

export const saveTodos = (newTodos: ITodo[]) => {
  localStorage.setItem("todos", JSON.stringify(newTodos));
};

export const loadCategory = (): CATEGORIES => {
  const category =
    (localStorage.getItem("category") as CATEGORIES) || CATEGORIES.TODO;
  return category;
};

export const saveCategory = (category: CATEGORIES) => {
  localStorage.setItem("category", category);
};
