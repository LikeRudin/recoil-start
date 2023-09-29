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

const BoardForList = ({ id, index }: BoardForListProps) => {
  const lists = useRecoilValue(listsState)[id];
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <DragSpace
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Droppable droppableId={id}>
            {(dropProvided) => (
              <DropSpace
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
              >
                {lists.map((id, index) => (
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
