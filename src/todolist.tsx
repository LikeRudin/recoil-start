import styled from "styled-components";
import { CATEGORIES, saveCategory } from "./todo-atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { Todo } from "./todo";
import { todoSelector, CategoriesAtom } from "./todo-atom";
import React from "react";

const Ul = styled.ul`
  height: 40%;
  width: auto;
  overflow-y: auto;
`;

const Li = styled(Todo)`
  border: solid black:2px;
  border-radius: 5px;
  font-size: large
`;

const Select = styled.select``;

const Option = styled.option``;

export const TodoList = () => {
  const todos = useRecoilValue(todoSelector);
  const [category, setCategory] = useRecoilState(CategoriesAtom);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const category = event.currentTarget.value as CATEGORIES;
    setCategory(category);
    saveCategory(category);
  };
  return (
    <>
      <Ul>
        <h1>Tasks</h1>
        {todos.length ? todos.map((todoAtom) => <Li {...todoAtom} />) : null}
      </Ul>
      <Select value={category} onInput={onInput}>
        <Option value={CATEGORIES.TODO}>{CATEGORIES.TODO}</Option>
        <Option value={CATEGORIES.DOING}>{CATEGORIES.DOING}</Option>
        <Option value={CATEGORIES.DONE}>{CATEGORIES.DONE}</Option>
      </Select>
    </>
  );
};
