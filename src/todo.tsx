import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { TodosAtom, saveTodos } from "./todo-atom";
import { Draggable } from "react-beautiful-dnd";
import React, { memo, useState, useEffect } from "react";

const Button = styled.button``;

const Bar = styled.div<{ isDragging: boolean }>`
  background-color: tomato;
`;

const ButtonWrapper = styled.div``;

const Input = styled.input``;

interface TodoProps {
  text: string;
  id: string;
  index: number;
  category: "TODO" | "DOING" | "DONE";
}

const TodoBar = ({ text, id, category, index }: TodoProps) => {
  const categories = ["TODO", "DOING", "DONE"];
  const [todoText, setTodoText] = useState(text);

  const setTodos = useSetRecoilState(TodosAtom);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.name as TodoProps["category"];
    setTodos((todos) => {
      const newTodos = todos.map((item) => {
        if (item["id"] !== id) {
          return item;
        }
        return { ...item, category: name };
      });
      saveTodos(newTodos);
      return newTodos;
    });
  };

  const handleDeleteClick = () => {
    setTodos((todos) => {
      const newTodos = todos.filter((item) => item["id"] !== id);
      saveTodos(newTodos);
      return newTodos;
    });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = event.currentTarget.name;
    const newText = event.currentTarget.value;
    setTodoText(newText);

    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo["id"] !== targetId) {
          return todo;
        }
        return { ...todo, text: newText };
      });
      saveTodos(newTodos);
      return newTodos;
    });
  };
  useEffect(() => {
    setTodoText(text); // Initialize todoText with the current text when it changes
  }, [text]);

  return (
    <Draggable draggableId={String(index)} index={index}>
      {(provided, snapshot) => (
        <Bar
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
        >
          <Input name={id} value={todoText} onChange={onChange}></Input>
          <ButtonWrapper>
            {categories
              .filter((kind) => kind !== category)
              .map((kind) => (
                <Button name={id} onClick={handleClick}>
                  {kind}
                </Button>
              ))}
            <Button name={id} onClick={handleDeleteClick}>
              🗑
            </Button>
          </ButtonWrapper>
        </Bar>
      )}
    </Draggable>
  );
};

export const Todo = memo(TodoBar);
