import styled from "styled-components";
import { TodosAtom } from "./todo-atom";
import { useRecoilValue } from "recoil";
import { Todo } from "./todo";
import { todoSelector } from "./todo-atom";

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
  const [todoList, doingList, doneList] = useRecoilValue(todoSelector);
  return (
    <>
      <Ul>
        <h1>Alls</h1>
        {todos.length ? todos.map((todoAtom) => <Li {...todoAtom} />) : null}
      </Ul>
      <Ul>
        <h1>Todos</h1>
        {todoList.length
          ? todoList.map((todoAtom) => <Li {...todoAtom} />)
          : null}
      </Ul>
      <Ul>
        <h1>Doings</h1>
        {doingList.length
          ? doingList.map((todoAtom) => <Li {...todoAtom} />)
          : null}
      </Ul>
      <Ul>
        <h1>Dones</h1>
        {doneList.length
          ? doneList.map((todoAtom) => <Li {...todoAtom} />)
          : null}
      </Ul>
    </>
  );
};
