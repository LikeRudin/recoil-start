import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { TodosAtom } from "./todo-atom";
const Button = styled.button``;

interface TodoProps {
  text: string;
  id: string;
  category: "TODO" | "DOING" | "DONE";
}

export const Todo = ({ text, id, category }: TodoProps) => {
  const categories = ["TODO", "DOING", "DONE"];
  const setTodoCategory = useSetRecoilState(TodosAtom);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name as TodoProps["category"];
    setTodoCategory((todos) => {
      const [targetTodo] = todos.filter(({ id: todoId }) => id === todoId);
      return [
        ...todos.filter(({ id: todoId }) => id !== todoId),
        { ...targetTodo, category: name },
      ];
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
    </>
  );
};
