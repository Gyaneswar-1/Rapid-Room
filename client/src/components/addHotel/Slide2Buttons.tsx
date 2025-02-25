import React from "react";
import { IconType } from "react-icons";

interface Slide2ButtonsProps {
  icon: IconType;
  text: string;
  selected: boolean;
  onClick: () => void;
}

function Slide2Buttons({ icon: Icon, text, selected, onClick }: Slide2ButtonsProps) {
  return (
    <div
      className={` h-22 w-40 gap-2 grow max-w-[179px] justify-start rounded-md border flex flex-col p-3 cursor-pointer ${selected ? 'border-2 border-teal-700 bg-teal-50' : 'bg-white'}`}
      onClick={onClick}
    >
      <Icon className="text-4xl font-thin text-neutral-800" />
      <p className="text-sm font-normal text-wrap" style={{ fontFamily: "Poppins" }}>{text}</p>
    </div>
  );
}

export default Slide2Buttons;
