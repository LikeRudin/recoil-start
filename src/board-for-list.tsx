import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import BarList from "./list-for-bar";
import { useRecoilValue } from "recoil";
import { listsState } from "./atoms";
interface BoardForListProps {
  id: string;
  index: number;
}

const DragSpace = styled.div`
  width: 80%;
  height: 30%;
`;

const DropSpace = styled.div`
  width: 100%;
  height: 100%;
  background-color: yellow;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input = styled.input``;

const BoardForList = ({ id, index }: BoardForListProps) => {
  const lists = useRecoilValue(listsState);
  const onDragEnd = ({ source, destination }: DropResult) => {
    console.log(source);
    console.log(destination);
  };
  return (
    <Draggable draggableId={"draggable" + id} index={index}>
      {(provided) => (
        <DragSpace ref={provided.innerRef} {...provided.draggableProps}>
          <Input value="Create Lists" />
          <h1 {...provided.dragHandleProps}>{id}</h1>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={"Board " + id}>
              {(dropProvided) => (
                <DropSpace
                  {...dropProvided.droppableProps}
                  key={id}
                  ref={dropProvided.innerRef}
                >
                  {lists[id].map((id, index) => (
                    <BarList id={id} index={index} key={`list-${index}`} />
                  ))}
                  {dropProvided.placeholder}
                </DropSpace>
              )}
            </Droppable>
          </DragDropContext>
        </DragSpace>
      )}
    </Draggable>
  );
};
export default BoardForList;
