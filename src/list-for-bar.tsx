import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Bar from "./bar";
interface ListForBarProps {
  id: string;
  index: number;
}
import { useRecoilValue } from "recoil";
import { valuesState } from "./atoms";
const DragSpace = styled.div``;
const DropSpace = styled.div``;

const ListForBar = ({ id, index }: ListForBarProps) => {
  const values = useRecoilValue(valuesState)[id];
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <DragSpace
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Droppable droppableId={id}>
            {(secondProvided) => (
              <DropSpace
                ref={secondProvided.innerRef}
                {...secondProvided.droppableProps}
              >
                {values.map((barProps, index) => (
                  <Bar {...barProps} index={index} />
                ))}
                {secondProvided.placeholder}
              </DropSpace>
            )}
          </Droppable>
        </DragSpace>
      )}
    </Draggable>
  );
};

export default ListForBar;
