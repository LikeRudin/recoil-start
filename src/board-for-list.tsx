import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import ListForBar from "./list-for-bar";
import { useRecoilValue } from "recoil";
import { listsSelector } from "./atoms";
import { memo } from "react";
interface BoardForListProps {
  boardName: string;
  boardIndex: number;
}

const DragSpace = styled.div`
  width: 95%;
  height: 30%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

interface IDropSpace {
  isDraggingOver: boolean;
  draggingFromThis: boolean;
}
const DropSpace = styled.div<IDropSpace>`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;

  width: 90%;
  height: 100%;
  padding: 20px;
  border-radius: 30px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "gray"
      : props.draggingFromThis
      ? "red"
      : "rgba(255,255,255, 0.6)"};
  transition: background-color 0.2s ease-in-out;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Input = styled.input``;

const BoardForList = ({ boardName, boardIndex }: BoardForListProps) => {
  const lists = useRecoilValue(
    listsSelector({
      boardIndex,
      boardName,
    })
  );

  return (
    <Draggable
      draggableId={`board-${boardName}-${boardIndex}`}
      index={boardIndex}
      key={`board-${boardName}`}
    >
      {(provided) => (
        <DragSpace ref={provided.innerRef} {...provided.draggableProps}>
          <h1 {...provided.dragHandleProps}>{boardName}</h1>

          <Droppable
            droppableId={`${boardName}-${boardIndex}`}
            direction="horizontal"
            type="column"
          >
            {(dropProvided, dropSnapshot) => (
              <DropSpace
                {...dropProvided.droppableProps}
                ref={dropProvided.innerRef}
                isDraggingOver={dropSnapshot.isDraggingOver}
                draggingFromThis={!!dropSnapshot.draggingFromThisWith}
              >
                {lists.map((list, index) => {
                  const [[listName, bars]] = Object.entries(list);
                  return (
                    <ListForBar
                      listName={listName}
                      key={`list-${index}`}
                      bars={bars}
                      boardIndex={boardIndex}
                      listIndex={index}
                      boardName={boardName}
                    />
                  );
                })}
                {dropProvided.placeholder}
              </DropSpace>
            )}
          </Droppable>

          <Input value="Create Lists" />
        </DragSpace>
      )}
    </Draggable>
  );
};
export default memo(BoardForList);
