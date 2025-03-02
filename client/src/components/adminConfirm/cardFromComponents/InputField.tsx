import React from "react";
import { IconType } from "react-icons";

interface InputFieldProps {
  title: string;
  placeholder: string;
  logo: IconType;
  type?: string;
  name: string;
  errors?: any;
  errorsFor?: any;
  minLength?:any;
  maxLength?:any;
  pattern?:any;
  registerValue?:any
}

function InputField({
  title,
  placeholder,
  logo: Logo,
  type,
  name,
  errors,
  errorsFor,
 
  registerValue
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex justify-between w-full text-md font-medium text-gray-700"
      >
        {title}
        <div className=" text-sm italic text-rose-500">
          {
            errorsFor && <span>{errorsFor.message}</span>
          }
          
        </div>
      </label>
      <div className="flex items-center mt-1 p-2 w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border focus-within:border-neutral-950">
        <Logo className="mx-1 mr-3 text-black text-xl" />
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="w-full outline-none"
          
          {...registerValue}
        />
      </div>
    </div>
  );
}

export default InputField;

