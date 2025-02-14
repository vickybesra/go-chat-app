import React, { ChangeEvent } from "react";

interface InputBoxProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}
const InputBox: React.FC<InputBoxProps> = ({
  type = "",
  value,
  onChange,
  placeholder = "",
  required = true,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="p-3 mt-8 rounded-md border-2 border-gray-600 focus:outline-none focus:border-blue"
      required={required}
    />
  );
};

export default InputBox;
