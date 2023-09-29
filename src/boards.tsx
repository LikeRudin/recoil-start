import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import BoardForList from "./board-for-list";
import { boardsState } from "./atoms";
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
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    } else if (
      source["droppableId"] === "main" &&
      destination["droppableId"] === "main"
    ) {
      setBoards((boards) => {
        const newBoards = [...boards];
        const [target] = newBoards.splice(source["index"], 1);
        newBoards.splice(destination["index"], 0, target);
        return newBoards;
      });
    }
    console.log("source");
    console.log(source);
    console.log("destination");
    console.log(destination);
    //is different Board
    //is Same Board
    //is Same list
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
