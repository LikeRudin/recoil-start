import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import BoardForList from "./board-for-list";
import FormCreatingBoard from "./components/create-board";

import { dataState, boardsSelector, saveDatas, loadDatas } from "./atoms";

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

const Boards = () => {
  const boards = useRecoilValue(boardsSelector);

  const setDatas = useSetRecoilState(dataState);

  const onBoardDragEnd = ({ source, destination }: DropResult) => {
    console.log(destination);
    if (!destination) {
      return;
    }
    const { droppableId: sourceId, index: sourceIndex } = source;
    const { droppableId: destinationId, index: destinationIndex } = destination;
    const distAddress = destinationId.split("-");
    const srcAddress = sourceId.split("-");
    console.log(distAddress);
    console.log(srcAddress);

    if (srcAddress.length === 1) {
      setDatas((oldDatas) => {
        const newData = [...oldDatas];
        const [target] = newData.splice(sourceIndex, 1);
        newData.splice(destinationIndex, 0, target);
        console.log(newData);
        saveDatas(newData);
        return newData;
      });
      return;
    }
    if (srcAddress.length === 2) {
      const distBoardIndex = distAddress[1];
      const srcBoardIndex = srcAddress[1];
      console.log("리스트 이동");
      setDatas((oldDatas) => {
        const newData = JSON.parse(JSON.stringify(oldDatas));
        const [target] = newData[+srcBoardIndex]["lists"].splice(
          sourceIndex,
          1
        );
        newData[+distBoardIndex]["lists"].splice(destinationIndex, 0, target);
        console.log(newData);
        saveDatas(newData);
        return newData;
      });
      return;
    }
    if (srcAddress.length === 3) {
      const [distBoardIndex, distListIndex] = distAddress.slice(1);
      const [srcBoardIndex, srcListIndex] = srcAddress.slice(1);
      setDatas((oldDatas) => {
        const newData = JSON.parse(JSON.stringify(oldDatas));
        if (
          newData[srcBoardIndex] &&
          newData[srcBoardIndex]["lists"] &&
          newData[srcBoardIndex]["lists"][srcListIndex] &&
          newData[srcBoardIndex]["lists"][srcListIndex]["bars"]
        ) {
          const [target] = newData[srcBoardIndex]["lists"][srcListIndex][
            "bars"
          ].splice(sourceIndex, 1);
          if (
            newData[distBoardIndex] &&
            newData[distBoardIndex]["lists"] &&
            newData[distBoardIndex]["lists"][distListIndex] &&
            newData[distBoardIndex]["lists"][distListIndex]["bars"]
          ) {
            newData[distBoardIndex]["lists"][distListIndex]["bars"].splice(
              destinationIndex,
              0,
              target
            );
          }
        }
        console.log("요소이동");
        console.log(newData);
        saveDatas(newData);
        return newData;
      });
    }
  };

  useEffect(() => {
    const datas = loadDatas();
    if (datas) {
      setDatas(datas);
    }
  }, []);

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
              {boards.map((_, index) => {
                return (
                  <BoardForList boardIndex={index} key={`board-${index}`} />
                );
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
