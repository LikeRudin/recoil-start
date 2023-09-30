import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { dataState } from "../atoms";
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
      const newData = [
        { name: boardName, id: Date.now(), lists: [] },
        ...oldData,
      ];
      return newData;
    });
    setValue("boardName", "");
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
