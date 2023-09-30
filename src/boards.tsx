import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import BoardForList from "./board-for-list";
import { dataState, boardsSelector } from "./atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import FormCreatingBoard from "./components/create-board";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;
interface IDragSpace {
  isDraggingOver: boolean;
}
const DropSpace = styled.div<IDragSpace>`
  background-color: ${(props) =>
    props.isDraggingOver ? "gray" : "transparent"};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
  height: 100%;
  border-radius: 30px;
`;

const Input = styled.input``;

const Boards = () => {
  const boards = useRecoilValue(boardsSelector);

  const setDatas = useSetRecoilState(dataState);

  const onBoardDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }
    const { droppableId: sourceId, index: sourceIndex } = source;
    const { droppableId: destinationId, index: destinationIndex } = destination;
    const distAddress = destinationId.split("-");
    const srcAddress = sourceId.split("-");

    console.log(distAddress);
    console.log(srcAddress);

    if (distAddress.length === 1) {
      setDatas((oldDatas) => {
        const newDatas = [...oldDatas];
        const [target] = newDatas.splice(sourceIndex, 1);
        newDatas.splice(destinationIndex, 0, target);
        console.log(newDatas);
        return newDatas;
      });
      return;
    }
    if (distAddress.length === 2) {
      const distBoardIndex = distAddress[1];
      const srcBoardIndex = srcAddress[1];
      console.log("리스트 이동");
      setDatas((oldDatas) => {
        const newDatas = JSON.parse(JSON.stringify(oldDatas));
        const [target] = newDatas[+srcBoardIndex]["lists"].splice(
          sourceIndex,
          1
        );
        newDatas[+distBoardIndex]["lists"].splice(destinationIndex, 0, target);
        console.log(newDatas);
        return newDatas;
      });
      return;
    }
    if (distAddress.length === 3) {
      const [distBoardIndex, distListIndex] = distAddress.slice(1);
      const [srcBoardIndex, srcListIndex] = srcAddress.slice(1);
      setDatas((oldDatas) => {
        const newDatas = JSON.parse(JSON.stringify(oldDatas));
        if (
          newDatas[srcBoardIndex] &&
          newDatas[srcBoardIndex]["lists"] &&
          newDatas[srcBoardIndex]["lists"][srcListIndex] &&
          newDatas[srcBoardIndex]["lists"][srcListIndex]["bars"]
        ) {
          const [target] = newDatas[srcBoardIndex]["lists"][srcListIndex][
            "bars"
          ].splice(sourceIndex, 1);
          if (
            newDatas[distBoardIndex] &&
            newDatas[distBoardIndex]["lists"] &&
            newDatas[distBoardIndex]["lists"][distListIndex] &&
            newDatas[distBoardIndex]["lists"][distListIndex]["bars"]
          ) {
            newDatas[distBoardIndex]["lists"][distListIndex]["bars"].splice(
              destinationIndex,
              0,
              target
            );
          }
        }
        console.log("요소이동");
        console.log(newDatas);
        return newDatas;
      });
    }
  };
  return (
    <Wrapper>
      <FormCreatingBoard />
      <DragDropContext onDragEnd={onBoardDragEnd}>
        <Droppable droppableId="main" type="board" direction="vertical">
          {(provided, snapshot) => (
            <DropSpace
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {boards.map((name, index) => {
                return <BoardForList boardName={name} boardIndex={index} />;
              })}
              {provided.placeholder}
            </DropSpace>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

export default Boards;
