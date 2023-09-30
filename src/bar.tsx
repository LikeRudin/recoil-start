import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { memo } from "react";

interface BarProps {
  id: number;
  text: string;
  boardName: string;
  listName: string;
  index: number;
}

interface IDragSpace {
  isDragging: boolean;
}

const DragSpace = styled.div<IDragSpace>`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "tomato" : "blue")};
  user-select: none;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  font-weight: 500;
`;
const DeleteButton = styled.button``;

const Input = styled.input``;
const Bar = ({ id, index, text, boardName, listName }: BarProps) => {
  return (
    <Draggable draggableId={`bar-${boardName}-${listName}-${id}`} index={index}>
      {(provided, snapshot) => (
        <DragSpace
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Input value={text} />
          <DeleteButton>🗑</DeleteButton>
        </DragSpace>
      )}
    </Draggable>
  );
};

export default memo(Bar);
