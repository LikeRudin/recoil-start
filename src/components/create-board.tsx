import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { IBoard, dataState, saveDatas } from "../atoms";

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  font-size: xx-large;
  text-align: center;
`;

const FormCreatingBoard = () => {
  const setData = useSetRecoilState(dataState);
  const { register, handleSubmit, setValue } = useForm();

  const onValid = ({ name }: IBoard) => {
    setData((oldData) => {
      const newData = [{ name: name, id: Date.now(), lists: [] }, ...oldData];
      saveDatas(newData);
      return newData;
    });
    setValue("name", "");
  };

  return (
    //@ts-ignore
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
