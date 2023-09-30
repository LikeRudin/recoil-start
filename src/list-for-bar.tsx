import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Bar from "./bar";
interface ListForBarProps {
  listName: string;
  bars: any[];
  index: number;
}

const DragSpace = styled.div``;
interface IDropSpace {
  isDraggingOver: boolean;
  draggingOverFromThis: boolean;
}
const DropSpace = styled.div<IDropSpace>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.draggingOverFromThis
      ? "yellow"
      : "transparent"};
  transition: background-color 0.2s ease-in-out;
  padding: 20px;
`;
const Input = styled.input``;

const ListForBar = ({ listName, index, bars }: ListForBarProps) => {
  const values = bars;

  return (
    <Draggable draggableId={`list-${listName}`} index={index}>
      {(provided) => (
        <DragSpace {...provided.draggableProps} ref={provided.innerRef}>
          <Input value="create Bar" />
          <h1 {...provided.dragHandleProps}>{listName}</h1>
          <Droppable droppableId={`list-${listName}`}>
            {(dropProvided, dropSnapshot) => (
              <DropSpace
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
                key={`bar-${index}`}
                isDraggingOver={dropSnapshot.isDraggingOver}
                draggingOverFromThis={!!dropSnapshot.draggingFromThisWith}
              >
                {values.map((barInfo, index) => (
                  <Bar {...barInfo} index={index} />
                ))}
                {dropProvided.placeholder}
              </DropSpace>
            )}
          </Droppable>
        </DragSpace>
      )}
    </Draggable>
  );
};

export default ListForBar;
