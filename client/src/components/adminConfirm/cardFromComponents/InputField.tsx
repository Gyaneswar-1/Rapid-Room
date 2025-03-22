import type { IconType } from "react-icons"

interface InputFieldProps {
  title: string
  placeholder: string
  logo: IconType
  type?: string
  name: string
  errors?: any
  errorsFor?: any
  minLength?: any
  maxLength?: any
  pattern?: any
  registerValue?: any
}

function InputField({ title, placeholder, logo: Logo, type, name, errorsFor, registerValue }: InputFieldProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {title}
        </label>
        {errorsFor && <span className="text-xs italic text-rose-500 font-medium">{errorsFor.message}</span>}
      </div>
      <div className="flex items-center px-3 py-2.5 w-full rounded-lg border border-gray-300 bg-white shadow-sm transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/30">
        <Logo className="flex-shrink-0 text-gray-500 mr-2 text-xl" />
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="w-full outline-none text-gray-800 placeholder-gray-400 bg-transparent"
          {...registerValue}
        />
      </div>
    </div>
  )
}

export default InputField

