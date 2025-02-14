import React from "react";

interface SubmitButtonProps {
  label?: string;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label = "Button",
  className = "",
}) => {
  return (
    <button
      type="submit"
      className={`mt-8 p-3 rounded-lg focus:outline-none focus:border-blue border-gray-600 font-bold transition duration-300 border hover:border-gray-600 hover:bg-gray-600 hover:text-white hover:text-white-800 ${className}`}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
