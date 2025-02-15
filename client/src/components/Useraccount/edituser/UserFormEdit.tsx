import React from "react";
import { CgClose } from "react-icons/cg";

interface texts {
  title: string;
  content: string;
  button: string;
}

function UserFormEdit(props: texts) {
  const [showWindow, setshowWindow] = React.useState(false);
  return (
    <div className="w-full h-fit ">
      <div className="flex justify-between pb-6 ">
        <div className="">
          <h1 className="text-xl">{props.title}</h1>
          <p className="text-md opacity-70">{props.content}</p>
        </div>
        <div>
          <button
            className="cursor-pointer bg-neutral-800 text-white py-1 px-3 rounded-3xl"
            onClick={() => {
              setshowWindow(!showWindow);
            }}
          >
            {props.button}
          </button>
        </div>
      </div>
      <hr />

      {showWindow && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center backdrop-brightness-40">
          <div className="text-stone-700 flex flex-col rounded-xl  bg-white p-8 w-[800px] h-fit opacity-100">
            <button
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setshowWindow(!showWindow);
              }}
            >
              <CgClose />
            </button>
            <div className="flex flex-col gap-10">
              <h1 className="text-xl">{`edit your ${props.title}`}</h1>
              <input
                type="text"
                id="Username"
                className="peer border bg-transparent w-full h-13 p-6 rounded-xl focus:border-neutral-800 focus:ring-0 focus:outline-hidden"
                defaultValue={props.content}
              />
              <button className="bg-neutral-800 text-white p-4 rounded-xl cursor-pointer w-full">
                submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserFormEdit;
