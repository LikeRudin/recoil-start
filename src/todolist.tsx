import styled from "styled-components";
import { TodosAtom } from "./todo-atom";
import { useRecoilValue } from "recoil";
import { Todo } from "./todo";

const Ul = styled.ul`
  height: 40%;
  width: auto;
  overflow-y: auto;
`;

const Li = styled(Todo)`
  border: solid black:2px;
  border-radius: 5px;
  font-size: large
`;

export const TodoList = () => {
  const todos = useRecoilValue(TodosAtom);
  return (
    <Ul>
      {todos.length ? todos.map((todoAtom) => <Li {...todoAtom} />) : null}
    </Ul>
  );
};
