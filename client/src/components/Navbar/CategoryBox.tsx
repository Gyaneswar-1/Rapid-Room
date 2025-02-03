import React from "react";
import { IconType } from "react-icons";

interface CategoryBoxPropes {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxPropes> = ({
  icon: Icon,
  label,
  selected
}) => {

  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-transparent text-neutral-500"
      } `}
    >
      <Icon size={24} />
      <p className="font-medium text-sm">{label}</p>
    </div>
  );
};

export default CategoryBox;
