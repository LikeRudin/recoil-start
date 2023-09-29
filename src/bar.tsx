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
        <DragSpace
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Input value={text} />
        </DragSpace>
      )}
    </Draggable>
  );
};

export default Bar;
