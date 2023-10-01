import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Bar from "./bar";
import React, { memo } from "react";
import FormCreatingBar from "./components/create-bar";
import { IBar, ListNameSelector, listsSelector } from "./atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
interface ListForBarProps {
  bars: any[];
  listIndex: number;
  boardIndex: number;
  boardName: string;
}

const DragSpace = styled.div`
  width: 280px;
  height: 100%;
`;
interface IDropSpace {
  isDraggingOver: boolean;
  draggingOverFromThis: boolean;
}
const DropSpace = styled.div<IDropSpace>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: 220px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "pink"
      : props.draggingOverFromThis
      ? "yellow"
      : "transparent"};
`;

const HandleBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Span = styled.span`
  margin-left: 5px;
`;

const TitleWrapper = styled.div`
  margin-top: 4.5%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 5px;
`;

const Input = styled.input`
  width: 50%;
  border: none;
  font-size: X-large;
`;

const Button = styled.button`
  font-size: large;
  border-radius: 3px;
  &:hover {
    background-color: white;
  }
`;

const ListForBar = ({ listIndex, bars, boardIndex }: ListForBarProps) => {
  const values = bars;
  const [listName, setListName] = useRecoilState(
    ListNameSelector({ boardIndex, listIndex })
  );
  const deleteList = useSetRecoilState(listsSelector({ boardIndex }));
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.currentTarget.value);
  };

  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetIndex = Number(event.currentTarget.value);
    deleteList(targetIndex);
  };
  return (
    <Draggable
      draggableId={`list-${boardIndex}-${listIndex}-${listIndex}`}
      index={listIndex}
    >
      {(provided) => (
        <DragSpace {...provided.draggableProps} ref={provided.innerRef}>
          <HandleBox {...provided.dragHandleProps}>
            <Button value={listIndex} onClick={onDeleteClick}>
              🗑
            </Button>
            <TitleWrapper>
              <Input value={listName} onChange={onChange} />
              <FormCreatingBar boardIndex={boardIndex} listIndex={listIndex} />
            </TitleWrapper>
            <Span>👋</Span>
          </HandleBox>

          <Droppable
            droppableId={`list-${boardIndex}-${listIndex}`}
            direction="vertical"
            type="row"
          >
            {(dropProvided, dropSnapshot) => (
              <DropSpace
                {...dropProvided.droppableProps}
                isDraggingOver={dropSnapshot.isDraggingOver}
                draggingOverFromThis={!!dropSnapshot.draggingFromThisWith}
                ref={dropProvided.innerRef}
              >
                {values.map((barInfo: IBar, index) => (
                  <Bar
                    barIndex={index}
                    boardIndex={boardIndex}
                    listIndex={listIndex}
                    {...barInfo}
                  />
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

export default memo(ListForBar);
