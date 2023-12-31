import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { dataState, saveDatas } from "../atoms";

interface FormCreatingBarProps {
  boardIndex: number;
  listIndex: number;
}

interface FormValue {
  text: string;
}

const Form = styled.form``;
const Input = styled.input``;

const FormCreatingBar = ({ boardIndex, listIndex }: FormCreatingBarProps) => {
  const setDatas = useSetRecoilState(dataState);
  const { register, setValue, handleSubmit } = useForm<FormValue>();
  const onValid = ({ text }: FormValue) => {
    setDatas((oldDatas) => {
      const newData = JSON.parse(JSON.stringify(oldDatas));
      newData[boardIndex]["lists"][listIndex]["bars"].unshift({
        text,
        id: Date.now(),
      });
      saveDatas(newData);
      return newData;
    });
    setValue("text", "");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("text", { required: "please type bar", minLength: 1 })}
        placeholder="create new Bar"
      />
    </Form>
  );
};

export default FormCreatingBar;
