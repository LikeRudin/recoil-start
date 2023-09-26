import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TodosAtom, CategoriesAtom } from "./todo-atom";

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

interface IForm {
  todo: string;
}

export const CreateTodo = () => {
  const setTodos = useSetRecoilState(TodosAtom);
  const category = useRecoilValue(CategoriesAtom);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onValid = ({ todo }: IForm) => {
    setTodos((acc) => [
      {
        text: todo,
        id: String(new Date()),
        category,
      },
      ...acc,
    ]);
    setValue("todo", "");
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <Input
          {...register("todo", {
            required: "write a todo than blank space",
            minLength: 3,
          })}
          placeholder="what is your todo?"
        />
        <Button value="Submit" />
      </Form>
    </Container>
  );
};
