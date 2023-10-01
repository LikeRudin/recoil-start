import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

import { dataState, saveDatas } from "../atoms";

interface FormCreatingBoardProps {
  boardIndex: number;
}

const Form = styled.form``;
const Input = styled.input`
  font-size: large;
  border: solid: 2px rgba(0,0,0, 0.4);

`;

interface FormValue {
  name: string;
}

const FormCreatingList = ({ boardIndex }: FormCreatingBoardProps) => {
  const setDatas = useSetRecoilState(dataState);
  const { register, setValue, handleSubmit } = useForm<FormValue>();
  const onValid = ({ name }: FormValue) => {
    setDatas((oldDatas) => {
      const newData = JSON.parse(JSON.stringify(oldDatas));
      newData[boardIndex]["lists"].unshift({ name, id: Date.now(), bars: [] });
      saveDatas(newData);
      return newData;
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
