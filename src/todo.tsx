import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { TodosAtom, saveTodos } from "./todo-atom";
const Button = styled.button``;

interface TodoProps {
  text: string;
  id: string;
  category: "TODO" | "DOING" | "DONE";
}

export const Todo = ({ text, id, category }: TodoProps) => {
  const categories = ["TODO", "DOING", "DONE"];

  const setTodos = useSetRecoilState(TodosAtom);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name as TodoProps["category"];
    setTodos((todos) => {
      const newTodos = todos.map((item) => {
        if (item["id"] !== id) {
          return item;
        }
        return { ...item, category: name };
      });
      saveTodos(newTodos);
      return newTodos;
    });
  };

  const handleDeleteClick = () => {
    setTodos((todos) => {
      const newTodos = todos.filter((item) => item["id"] !== id);
      saveTodos(newTodos);
      return newTodos;
    });
  };

  return (
    <>
      <li key={id}>
        {category} : {text}
      </li>
      {categories
        .filter((kind) => kind !== category)
        .map((kind) => (
          <Button name={kind} onClick={handleClick}>
            {kind}
          </Button>
        ))}
      <Button name="delete" onClick={handleDeleteClick}>
        delete
      </Button>
    </>
  );
};
