import { ChangeEvent, FC, ReactElement } from "react";

interface Props {
  label: string;
  type: string;
  id: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
const Input: FC<Props> = (props): ReactElement => {
  const { label, type, id, onChange, value } = props;
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-gray-700 font-bold">
        {label}
      </label>
      <input
        id={id}
        title={label}
        type={type}
        onChange={onChange}
        value={value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  text-center font-bold"
      />
    </div>
  );
};

// export component
export default Input;
