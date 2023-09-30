import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { ILists, dataState } from "../atoms";

interface FormCreatingBoardProps {
  boardIndex: number;
}

const Form = styled.form``;
const Input = styled.input``;

const FormCreatingList = ({ boardIndex }: FormCreatingBoardProps) => {
  const setDatas = useSetRecoilState(dataState);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ name }: ILists) => {
    setDatas((oldDatas) => {
      const newDatas = JSON.parse(JSON.stringify(oldDatas));
      newDatas[boardIndex]["lists"].unshift({ name, id: Date.now(), bars: [] });
      return newDatas;
    });
    setValue("name", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("name", { required: true, minLength: 1 })}
        placeholder="create new List"
      />
    </Form>
  );
};

export default FormCreatingList;
