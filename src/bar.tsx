import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { Snapshot } from "recoil";

interface BarProps {
  id: string;
  index: number;
  text: string;
}

const Element = styled.input``;

const Bar = ({ id, index, text }: BarProps) => {
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided, Snapshot) => (
        <Element
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          value={text}
        />
      )}
    </Draggable>
  );
};

export default Bar;
