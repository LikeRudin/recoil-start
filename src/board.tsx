import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Bar from "./bar";
interface BoardProps {
  id: string;
  index: number;
  bars: (typeof Bar)[];
}

const BarsBorder = styled.div``;
const BarsPadding = styled.div``;

const Board = ({ bars, id, index }: BoardProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, Snapshot) => (
        <BarsBorder
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Droppable droppableId="BarId">
            {(provided) => (
              <BarsPadding ref={provided.innerRef} {...provided.droppableProps}>
                {bars?.map((item, index) => (
                  <Bar id="barId" index={index} text={`${item}`} />
                ))}
              </BarsPadding>
            )}
          </Droppable>
        </BarsBorder>
      )}
    </Draggable>
  );
};

export default Board;
