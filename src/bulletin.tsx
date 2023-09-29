import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./board";

const Body = styled.div`
  width: 100vw;
  height: 100vh;
`;

interface IBoardWrapper {
  ref: (element: HTMLElement | null) => void;
}
const BoardsWrapper = styled.div``;

const Input = styled.input`
  width: 50%;
  height: 15%;
`;

const BulletinBoard = () => {
  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(source);
    console.log(destination);
  };
  return (
    <>
      <Input></Input>
      <DragDropContext onDragEnd={onDragEnd}>
        <Body>
          <Droppable droppableId="main">
            {(dropProvided, dropSnapshot) => (
              <BoardsWrapper
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              ></BoardsWrapper>
            )}
          </Droppable>
        </Body>
      </DragDropContext>
    </>
  );
};

export default BulletinBoard;
