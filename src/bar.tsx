import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { memo } from "react";

interface BarProps {
  id: number;
  text: string;
  boardIndex: number;
  listIndex: number;
  index: number;
}

interface IDragSpace {
  isDragging: boolean;
}

const DragSpace = styled.div<IDragSpace>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : "rgba(0, 0, 0, 0.7)"};
  user-select: none;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  font-size: x-large;
  border: none;
`;
const Bar = ({ id, index, text, boardIndex, listIndex }: BarProps) => {
  return (
    <Draggable
      draggableId={`bar-${boardIndex}-${listIndex}-${id}`}
      index={index}
    >
      {(provided, snapshot) => (
        <DragSpace
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Input value={text} />
        </DragSpace>
      )}
    </Draggable>
  );
};

export default memo(Bar);
