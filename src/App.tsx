import { createGlobalStyle } from "styled-components";
import { TodoList } from "./todolist";
import { CreateTodo } from "./create-todo";
import styled from "styled-components";
import { useEffect } from "react";
import {
  loadTodos,
  TodosAtom,
  CategoriesAtom,
  loadCategory,
  saveTodos,
} from "./todo-atom";
import { useSetRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const App = () => {
  const setTodos = useSetRecoilState(TodosAtom);
  const setCategory = useSetRecoilState(CategoriesAtom);

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) {
      return;
    }
    setTodos((todos) => {
      const target = todos[source["index"]];
      const newTodos = [...todos];
      newTodos.splice(source["index"], 1);
      newTodos.splice(destination["index"], 0, target);
      saveTodos(newTodos);
      return newTodos;
    });
  };

  useEffect(() => {
    const todos = loadTodos();
    if (todos) {
      setTodos(todos);
    }
    const category = loadCategory();
    setCategory(category);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <CreateTodo />
        <DragDropContext onDragEnd={onDragEnd}>
          <TodoList />
        </DragDropContext>
      </Wrapper>
    </>
  );
};
