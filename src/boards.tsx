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
  const [boards, setBoards] = useRecoilState(boardsState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }
    const [sourceId, destinationId] = [
      source["droppableId"],
      destination["droppableId"],
    ];
    const [sourceIndex, destinationIndex] = [
      source["index"],
      destination["index"],
    ];

    if (sourceId === "main" && destinationId === "main") {
      setBoards((boards) => {
        const newBoards = [...boards];
        const [target] = newBoards.splice(sourceIndex, 1);
        newBoards.splice(destinationIndex, 0, target);
        return newBoards;
      });
    } else if (source) console.log("source");
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
            <DropSpace {...provided.droppableProps} ref={provided.innerRef}>
              {boards.map((item, index) => (
                <BoardForList id={item} index={index} key={`board-${index}`} />
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
