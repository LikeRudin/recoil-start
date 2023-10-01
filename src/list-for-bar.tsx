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
  width: 220px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.draggingOverFromThis
      ? "yellow"
      : "transparent"};
`;

const TitleWrapper = styled.div`
  margin-top: 4.5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 50%;
  border: none;
  font-size: X-large;
`;

const ListForBar = ({
  listName,
  listIndex,
  bars,
  boardIndex,
}: ListForBarProps) => {
  const values = bars;
  return (
    <Draggable
      draggableId={`list-${boardIndex}-${listIndex}-${listIndex}`}
      index={listIndex}
    >
      {(provided) => (
        <DragSpace {...provided.draggableProps} ref={provided.innerRef}>
          <TitleWrapper {...provided.dragHandleProps}>
            <Input value={listName} />
            <FormCreatingBar boardIndex={boardIndex} listIndex={listIndex} />
          </TitleWrapper>

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
                    boardIndex={boardIndex}
                    listIndex={listIndex}
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
