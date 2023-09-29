import { Droppable, Draggable } from "react-beautiful-dnd";
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Input = styled.input``;

const BoardForList = ({ id, index }: BoardForListProps) => {
  const lists = useRecoilValue(listsState);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <DragSpace
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Input value="Create Lists" />
          <h1>{id}</h1>
          <Droppable droppableId={id} key={id}>
            {(dropProvided) => (
              <DropSpace
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                key={id}
              >
                {lists[id].map((id, index) => (
                  <BarList id={id} index={index} />
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
export default BoardForList;
