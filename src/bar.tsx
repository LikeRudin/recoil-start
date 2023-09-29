import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface BarProps {
  id: string;
  index: number;
  text: string;
}

const DragSpace = styled.div``;

const Input = styled.input``;
const Bar = ({ id, index, text }: BarProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <DragSpace {...provided.dragHandleProps} {...provided.draggableProps}>
          <Input value={text} />
        </DragSpace>
      )}
    </Draggable>
  );
};

export default Bar;
