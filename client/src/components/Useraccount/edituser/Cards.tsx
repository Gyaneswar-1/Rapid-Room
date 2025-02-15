import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Card {
  icon: IconType;
  title: string;
  description: string;
  toThe: string;
}

function Cards(props: Card) {
  return (
    <Link
      to={props.toThe}
      className="border px-5 py-5 flex flex-col grow max-w-86 max-h-52 rounded-xl hover:shadow-2xl  border- transition cursor-pointer "
    >
      <div className="logo text-4xl">{React.createElement(props.icon)}</div>
      <div>
        <h1 className="text-lg font-semibold">{props.title}</h1>
        <p className="font-thin text-sm pt-2">{props.description}</p>
      </div>
    </Link>
  );
}

export default Cards;
