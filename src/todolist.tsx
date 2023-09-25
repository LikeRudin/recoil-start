import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  height: 50%;
  width: auto;
`;
const Form = styled.form`
  height: 100%;
  width: auto;
  font-size: xx-large;
`;

const Input = styled.input``;

const Button = styled.input.attrs({ type: "submit" })``;

const Ul = styled.ul`
  height: 40%;
  width: auto;
  overflow-y: auto;
`;
const Li = styled.li`
border: solid black:2px;
border-radius: 5px;
font-size: large`;

export const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<string[]>([]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodoList((todoList) => [...todoList, todo]);
    setTodo("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTodo(value);
  };

  return (
    <Wrapper>
      <Container>
        <Form onSubmit={onSubmit}>
          <Input value={todo} onChange={onChange} placeholder="todoInput" />
          <Button value="Submit" />
        </Form>
      </Container>
      <Ul>
        {todoList.length > 0
          ? todoList.map((item, index) => <Li key={index}>{item}</Li>)
          : "null"}
      </Ul>
    </Wrapper>
  );
};
