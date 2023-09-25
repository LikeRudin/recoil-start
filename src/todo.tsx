interface TodoProps {
  text: string;
  id: string;
  category: "TODO" | "DOING" | "DONE";
}

export const Todo = ({ text, id, category }: TodoProps) => {
  return (
    <>
      <li key={id}>
        {category} : {text}
      </li>
    </>
  );
};
