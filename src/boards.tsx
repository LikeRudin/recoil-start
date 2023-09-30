import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import BoardForList from "./board-for-list";
import { boardState, dataState } from "./atoms";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DropSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input``;

const Boards = () => {
  const [boards, setBoards] = useRecoilState(boardState);
  const [datas, setDatas] = useRecoilState(dataState);

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
      const [distBoardName, distBoardIndex] = distAddress;
      const [srcBoardName, srcBoardIndex] = srcAddress;
      console.log("리스트 이동");
      setDatas((oldDatas) => {
        const newDatas = JSON.parse(JSON.stringify(oldDatas));
        const [target] = newDatas[+srcBoardIndex][srcBoardName].splice(
          sourceIndex,
          1
        );
        newDatas[+distBoardIndex][distBoardName].splice(
          destinationIndex,
          0,
          target
        );
        console.log(newDatas);
        return newDatas;
      });
      return;
    }
    if (distAddress.length === 4) {
      const [distBoardName, distBoardIndex, distListName, distListIndex] =
        distAddress;
      const [srcBoardName, srcBoardIndex, srcListName, srcListIndex] =
        srcAddress;
      setDatas((oldDatas) => {
        const newDatas = JSON.parse(JSON.stringify(oldDatas));
        if (
          newDatas[srcBoardIndex] &&
          newDatas[srcBoardIndex][srcBoardName] &&
          newDatas[srcBoardIndex][srcBoardName][srcListIndex] &&
          newDatas[srcBoardIndex][srcBoardName][srcListIndex][srcListName]
        ) {
          const [target] = newDatas[srcBoardIndex][srcBoardName][srcListIndex][
            srcListName
          ].splice(sourceIndex, 1);
          if (
            newDatas[distBoardIndex] &&
            newDatas[distBoardIndex][distBoardName] &&
            newDatas[distBoardIndex][distBoardName][distListIndex] &&
            newDatas[distBoardIndex][distBoardName][distListIndex][distListName]
          ) {
            newDatas[distBoardIndex][distBoardName][distListIndex][
              distListName
            ].splice(destinationIndex, 0, target);
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
      <Input value="Create Boards" />
      <DragDropContext onDragEnd={onBoardDragEnd}>
        <Droppable droppableId="main">
          {(provided) => (
            <DropSpace ref={provided.innerRef} {...provided.droppableProps}>
              {[...Object.entries(boards)].map((boardProps, index) => {
                const [boardName, listNames] = boardProps;
                return (
                  <BoardForList
                    boardName={boardName}
                    listNames={listNames}
                    boardIndex={index}
                    key={`board-${index}`}
                  />
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
