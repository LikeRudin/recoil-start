import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import React, { memo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { barTextSelector, barsSelector } from "./atoms.tsx";

interface BarProps {
  id: number;
  boardIndex: number;
  listIndex: number;
  barIndex: number;
}

interface IDragSpace {
  isDragging: boolean;
}

const DragSpace = styled.div<IDragSpace>`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 90%;
  height: 100%;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : "rgba(0, 0, 0, 0.7)"};
  user-select: none;
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  font-size: x-large;
  border: none;
`;
const Button = styled.button`
  font-size: large;
  border-radius: 3px;
  &:hover {
    background-color: white;
  }
`;

const Bar = ({ id, boardIndex, listIndex, barIndex }: BarProps) => {
  const [barText, setBarText] = useRecoilState(
    barTextSelector({ boardIndex, listIndex, barIndex })
  );
  const deleteBars = useSetRecoilState(barsSelector({ boardIndex, listIndex }));

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBarText(event.currentTarget.value);
  };

  const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const targetIndex = Number(event.currentTarget.value);
    deleteBars(targetIndex);
  };

  return (
    <Draggable
      draggableId={`bar-${boardIndex}-${listIndex}-${id}`}
      index={barIndex}
    >
      {(provided, snapshot) => (
        <DragSpace
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <Input value={barText} onChange={onChange} />
          <Button value={barIndex} onClick={onDeleteClick}>
            🗑
          </Button>
        </DragSpace>
      )}
    </Draggable>
  );
};

export default memo(Bar);
