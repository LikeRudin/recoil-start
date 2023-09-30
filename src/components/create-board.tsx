import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { IBoard, dataState } from "../atoms";
interface IonValidArg {
  boardName: string;
}
const Form = styled.form``;
const Input = styled.input``;

const FormCreatingBoard = () => {
  const setData = useSetRecoilState(dataState);
  const { register, handleSubmit, setValue } = useForm();

  const onValid = ({ boardName }: IonValidArg) => {
    setData((oldData) => {
      const newBoard: Record<string, []> = {};
      newBoard[boardName] = [];
      const newData = [newBoard as IBoard, ...oldData];
      return newData;
    });
    setValue("board", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("boardName", { required: true })}
        type="text"
        placeholder="Create new Board"
      />
    </Form>
  );
};

export default FormCreatingBoard;
