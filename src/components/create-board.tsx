import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { IBoard, dataState } from "../atoms";

const Form = styled.form``;
const Input = styled.input``;

const FormCreatingBoard = () => {
  const setData = useSetRecoilState(dataState);
  const { register, handleSubmit, setValue } = useForm();

  const onValid = ({ name }: IBoard) => {
    setData((oldData) => {
      const newData = [{ name: name, id: Date.now(), lists: [] }, ...oldData];
      return newData;
    });
    setValue("name", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("name", { required: true })}
        type="text"
        placeholder="Create new Board"
      />
    </Form>
  );
};

export default FormCreatingBoard;
