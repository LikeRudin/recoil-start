import styled from "styled-components";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import Bar from "./bar";
interface ListForBarProps {
  id: string;
  index: number;
}
import { useRecoilValue } from "recoil";
import { valuesState } from "./atoms";
const DragSpace = styled.div``;
const DropSpace = styled.div`
  background-color: blue;
`;
const Input = styled.input``;

const ListForBar = ({ id, index }: ListForBarProps) => {
  const values = useRecoilValue(valuesState)[id];
  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(source);
    console.log(destination);
  };
  return (
    <Draggable draggableId={`list-${id}`} index={index}>
      {(provided) => (
        <DragSpace {...provided.draggableProps} ref={provided.innerRef}>
          <Input value="create Bar" />
          <h1 {...provided.dragHandleProps}>{id}</h1>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"List " + id}>
              {(secondProvided) => (
                <DropSpace
                  {...secondProvided.droppableProps}
                  ref={secondProvided.innerRef}
                  key={id}
                >
                  {values.map((barProps, index) => (
                    <Bar {...barProps} index={index} key={`bar-${index}`} />
                  ))}
                  {secondProvided.placeholder}
                </DropSpace>
              )}
            </Droppable>
          </DragDropContext>
        </DragSpace>
      )}
    </Draggable>
  );
};

export default ListForBar;
