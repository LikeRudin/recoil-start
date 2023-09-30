import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Bar from "./bar";
import { useEffect, useState } from "react";
interface ListForBarProps {
  listName: string;
  bars: any[];
  index: number;
  boardName: string;
}

const DragSpace = styled.div`
  width: 100%;
  height: 100%;
`;
interface IDropSpace {
  isDraggingOver: boolean;
  draggingOverFromThis: boolean;
}
const DropSpace = styled.div<IDropSpace>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 80%;
  height: 100%;
  padding: 5px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.draggingOverFromThis
      ? "yellow"
      : "green"};
`;
const Input = styled.input``;

const ListForBar = ({ listName, index, bars, boardName }: ListForBarProps) => {
  const [listTitle, setListTitle] = useState(listName);
  const values = bars;
  useEffect(() => {
    if (listTitle !== listName) {
      setListTitle(listTitle);
    }
  });
  return (
    <Draggable
      draggableId={`list-${boardName}-${listName}-${index}`}
      index={index}
    >
      {(provided) => (
        <DragSpace {...provided.draggableProps} ref={provided.innerRef}>
          <Input value="create Bar" />
          <h1 {...provided.dragHandleProps}>{listName}</h1>
          <Droppable
            droppableId={`list-${boardName}-${index}`}
            direction="vertical"
            type="row"
          >
            {(dropProvided, dropSnapshot) => (
              <DropSpace
                {...dropProvided.droppableProps}
                key={`bar-${index}`}
                isDraggingOver={dropSnapshot.isDraggingOver}
                draggingOverFromThis={!!dropSnapshot.draggingFromThisWith}
                ref={dropProvided.innerRef}
              >
                {values.map((barInfo, index) => (
                  <Bar {...barInfo} index={index} boardName={boardName} />
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
