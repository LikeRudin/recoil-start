import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import styled from "styled-components";
import Boards from "./boards.tsx";
const GlobalStyle = createGlobalStyle`
${reset}`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Boards />
      </Wrapper>
    </>
  );
};
