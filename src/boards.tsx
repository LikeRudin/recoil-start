import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import BoardForList from "./board-for-list";
import { boardsState } from "./atoms";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const DropSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input``;

const Boards = () => {
  const boards = useRecoilValue(boardsState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(source);
    console.log(destination);
  };
  return (
    <Wrapper>
      <Input value="Create Boards" />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="main">
          {(provided) => (
            <DropSpace
              ref={provided.innerRef}
              {...provided.droppableProps}
              key="main"
            >
              {boards.map((item, index) => (
                <BoardForList id={item} index={index} />
              ))}
              {provided.placeholder}
            </DropSpace>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default Boards;
