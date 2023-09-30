import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Bar from "./bar";
import { useEffect, useState, memo } from "react";
import FormCreatingBar from "./components/create-bar";
interface ListForBarProps {
  listName: string;
  bars: any[];
  listIndex: number;
  boardIndex: number;
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
  height: 100%;
  width: 200px;
  overflow-x: auto;

  padding: 5px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.draggingOverFromThis
      ? "yellow"
      : "transparent"};
`;
const Input = styled.input``;

const ListForBar = ({
  listName,
  listIndex,
  bars,
  boardName,
  boardIndex,
}: ListForBarProps) => {
  const [listTitle, setListTitle] = useState(listName);
  const values = bars;
  useEffect(() => {
    if (listTitle !== listName) {
      setListTitle(listTitle);
    }
  });
  return (
    <Draggable
      draggableId={`list-${boardName}-${listName}-${listIndex}`}
      index={listIndex}
    >
      {(provided) => (
        <DragSpace {...provided.draggableProps} ref={provided.innerRef}>
          <FormCreatingBar boardIndex={boardIndex} listIndex={listIndex} />
          <h1 {...provided.dragHandleProps}>{listName}</h1>
          <Droppable
            droppableId={`list-${boardIndex}-${listIndex}`}
            direction="vertical"
            type="row"
          >
            {(dropProvided, dropSnapshot) => (
              <DropSpace
                {...dropProvided.droppableProps}
                isDraggingOver={dropSnapshot.isDraggingOver}
                draggingOverFromThis={!!dropSnapshot.draggingFromThisWith}
                ref={dropProvided.innerRef}
              >
                {values.map((barInfo, index) => (
                  <Bar
                    index={index}
                    boardName={boardName}
                    listName={listName}
                    {...barInfo}
                  />
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

export default memo(ListForBar);
