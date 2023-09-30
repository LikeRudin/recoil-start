import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import BoardForList from "./board-for-list";
import { boardState } from "./atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

// interface IDropSpace {
//   isDraggingOver: boolean;
// }

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
  const [boards, setBoards] = useRecoilState(boardState);
  const onBoardDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }
    setBoards((boards) => boards);
  };
  return (
    <Wrapper>
      <Input value="Create Boards" />
      <DragDropContext onDragEnd={onBoardDragEnd}>
        <Droppable droppableId="main">
          {(provided) => (
            <DropSpace ref={provided.innerRef} {...provided.droppableProps}>
              {[...Object.entries(boards)].map((boardProps, index) => {
                const [boardName, listNames] = boardProps;
                return (
                  <BoardForList
                    boardName={boardName}
                    listNames={listNames}
                    index={index}
                    key={`board-${index}`}
                  />
                );
              })}
              {provided.placeholder}
            </DropSpace>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default Boards;
