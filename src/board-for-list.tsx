import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import ListForBar from "./list-for-bar";
import { useRecoilState } from "recoil";
import { listState } from "./atoms";
interface BoardForListProps {
  boardName: string;
  listNames: string[];
  index: number;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const DragSpace = styled.div`
  width: 80%;
  height: 30%;
`;

interface IDropSpace {
  isDraggingOver: boolean;
  draggingFromThis: boolean;
}
const DropSpace = styled.div<IDropSpace>`
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "gray"
      : props.draggingFromThis
      ? "red"
      : "transparent"};
  transition: background-color 0.2s ease-in-out;
`;

const Input = styled.input``;

const BoardForList = ({ boardName, listNames, index }: BoardForListProps) => {
  const [lists, setLists] = useRecoilState(listState);
  const onDragEndInBoard = ({ source, destination }: DropResult) => {
    console.log("in board dragging");
    if (!destination) {
      return;
    }
    const { droppableId: sourceId, index: sourceIndex } = source;
    const { droppableId: destinationId, index: destinationIndex } = destination;
    console.log(destinationId);
    console.log(sourceId);
    if (sourceId === "board" && destinationId === "board") {
      setLists((lists) => {
        const newLists = [...lists];
        const [target] = newLists.splice(sourceIndex, 1);
        newLists.splice(destinationIndex, 0, target);
        return newLists;
      });
    }
  };
  const onListBeforeDragStart = () => {
    console.log("start drag in board");
  };

  return (
    <Draggable
      draggableId={`board-${boardName}-${index}`}
      index={index}
      key={`board-${boardName}`}
    >
      {(provided) => (
        <DragSpace ref={provided.innerRef} {...provided.draggableProps}>
          <h1 {...provided.dragHandleProps}>{boardName}</h1>

          <Droppable
            droppableId={`board-${boardName}`}
            direction="horizontal"
            type="column"
          >
            {(dropProvided, dropSnapshot) => (
              <DropSpace
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
                isDraggingOver={dropSnapshot.isDraggingOver}
                draggingFromThis={!!dropSnapshot.draggingFromThisWith}
              >
                {lists.map((list, index) => {
                  const [[listName, bars]] = Object.entries(list);
                  return (
                    <ListForBar
                      listName={listName}
                      index={index}
                      key={`list-${index}`}
                      bars={bars}
                      boardName={boardName}
                    />
                  );
                })}
                {dropProvided.placeholder}
              </DropSpace>
            )}
          </Droppable>

          <Input value="Create Lists" />
        </DragSpace>
      )}
    </Draggable>
  );
};
export default BoardForList;
