import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React, { memo } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

import FormCreatingList from "./components/create-list.tsx";
import ListForBar from "./list-for-bar.tsx";

import {
  ILists,
  boardNameSelector,
  dataState,
  listsSelector,
  saveDatas,
} from "./atoms";

interface BoardForListProps {
  boardIndex: number;
}
interface IDraggingCondition {
  isDraggingOver: boolean;
  draggingFromThis: boolean;
}

const DragSpace = styled.div<IDraggingCondition>`
  width: 95%;
  height: 30%;
  overflow-x: auto;
  border-radius: 40px;
  background-color: ${(props) =>
    props.isDraggingOver ? "gray" : props.draggingFromThis ? "red" : "#9EDDFF"};
  transition: background-color 0.2s ease-in-out;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropSpace = styled.div<IDraggingCondition>`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;

  width: 100%;
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

const TitleWrapper = styled.div`
  margin-top: 3%;
  display: flex;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 2%;
`;

const Input = styled.input`
  border: none;
  font-size: xx-large;
  width: 200px;
  height: 20%;
  margin-right: 5%;
`;
const Button = styled.button`
  font-size: xx-large;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  &:hover {
    background-color: white;
  }
  margin: 0px 30px;
`;
const Span = styled.span`
  width: 250px;
  font-size: xxx-large;
`;

const BoardForList = ({ boardIndex }: BoardForListProps) => {
  const lists = useRecoilValue(
    listsSelector({
      boardIndex,
    })
  ) as ILists[];

  const setData = useSetRecoilState(dataState);
  const [boardName, setBoardName] = useRecoilState(
    boardNameSelector({ boardIndex })
  );
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.currentTarget.value);
  };
  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetIndex = Number(event.currentTarget.value);
    setData((oldData) => {
      const newData = JSON.parse(JSON.stringify(oldData));
      newData.splice(targetIndex, 1);
      saveDatas(newData);
      return newData;
    });
  };

  return (
    <Draggable
      draggableId={`board-${boardName}-${boardIndex}`}
      index={boardIndex}
    >
      {(provided, snapshot) => (
        <DragSpace
          ref={provided.innerRef}
          {...provided.draggableProps}
          isDraggingOver={!!snapshot.draggingOver}
          draggingFromThis={snapshot.isDragging}
        >
          <TitleWrapper {...provided.dragHandleProps}>
            <Button value={boardIndex} onClick={onDeleteClick}>
              🗑
            </Button>
            <Input value={boardName} onChange={onChange} />
            <FormCreatingList boardIndex={boardIndex} />

            <Span>👋</Span>
          </TitleWrapper>

          <Droppable
            droppableId={`board-${boardIndex}`}
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
                  const { bars } = list;
                  return (
                    <ListForBar
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
        </DragSpace>
      )}
    </Draggable>
  );
};
export default memo(BoardForList);
