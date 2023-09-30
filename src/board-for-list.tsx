import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import ListForBar from "./list-for-bar";
import { useRecoilValue } from "recoil";
import { listState } from "./atoms";
interface BoardForListProps {
  boardName: string;
  listNames: string[];
  index: number;
}

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
  const lists = useRecoilValue(listState);
  const onDragEndInBoard = ({ source, destination }: DropResult) => {
    console.log(source);
    console.log(destination);
  };
  const onListBeforeDragStart = () => {
    console.log(`starting..drag`);
  };

  return (
    <Draggable
      draggableId={`board-${index}`}
      index={index}
      key={`board-${boardName}`}
    >
      {(provided) => (
        <DragSpace ref={provided.innerRef} {...provided.draggableProps}>
          <h1 {...provided.dragHandleProps}>{boardName}</h1>
          <DragDropContext
            onDragEnd={onDragEndInBoard}
            onBeforeDragStart={onListBeforeDragStart}
          >
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
                  {listNames.map((listName, index) => (
                    <ListForBar
                      listName={listName}
                      index={index}
                      key={`list-${index}`}
                      bars={lists[listName]}
                    />
                  ))}

                  {dropProvided.placeholder}
                </DropSpace>
              )}
            </Droppable>
          </DragDropContext>
          <Input value="Create Lists" />
        </DragSpace>
      )}
    </Draggable>
  );
};
export default BoardForList;
