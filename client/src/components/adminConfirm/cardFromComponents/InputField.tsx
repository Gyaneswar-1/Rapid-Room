import React from "react";
import { IconType } from "react-icons";

interface InputFieldProps {
  title: string;
  placeholder: string;
  logo: IconType;
  type?: string;
  register: any;
  name: string;
  errors?: any;
}

function InputField({
  title,
  placeholder,
  logo: Logo,
  type = "text",
  register,
  name,
  errors,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="flex justify-between w-full text-md font-medium text-gray-700"
      >
        {title}
        <div className="font-semibold italic text-rose-500">
          error message
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[name].message} error message
            </p>
          )}
        </div>
      </label>
      <div className="flex items-center mt-1 p-2 w-full rounded-md border border-gray-300 text-lg shadow-xs sm:text-sm focus-within:border focus-within:border-neutral-950">
        <Logo className="mx-1 mr-3 text-black text-xl" />
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="w-full outline-none"
          {...register(name)}
        />
      </div>
    </div>
  );
}

export default InputField;
