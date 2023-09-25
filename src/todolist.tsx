import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
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

interface IForm {
  todo: string;
}

export const TodoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = (data: IForm) => {
    console.log(data.todo);
    setValue("todo", "hello");
  };
  return (
    <Wrapper>
      <Container>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("todo", { required: true, minLength: 3 })}
            placeholder="todoInput"
          />
          <Button value="Submit" />
        </Form>
      </Container>
      <Ul></Ul>
    </Wrapper>
  );
};
