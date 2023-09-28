import styled from "styled-components";
import { CATEGORIES, TodosAtom } from "./todo-atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { Todo } from "./todo";
import { Droppable } from "react-beautiful-dnd";

interface IBoardProps {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}
const Board = styled.div<IBoardProps>`
  height: 100%;
  width: auto;
  overflow-y: auto;
`;

const Li = styled(Todo)`
  height:15%;
  width: 100%;
  border: solid black:2px;
  border-radius: 5px;
  font-size: large;
`;

export const TodoList = () => {
  const todos = useRecoilValue(TodosAtom);

  return (
    <>
      <Droppable droppableId="todo">
        {(provided, snapshot) => (
          <Board
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h1>Tasks</h1>

            {todos.length
              ? todos.map((todoAtom, index) => (
                  <Li {...todoAtom} index={index} />
                ))
              : null}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </>
  );
};
