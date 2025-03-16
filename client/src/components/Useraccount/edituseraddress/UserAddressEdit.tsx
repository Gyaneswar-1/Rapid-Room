"use client"

import React from "react"
import { CgClose } from "react-icons/cg"

interface AddressField {
  title: string
  content: string
  button: string
}

function AddressFormEdit(props: AddressField) {
  const [showWindow, setShowWindow] = React.useState(false)

  return (
    <div className="w-full h-fit">
      <div className="flex justify-between pb-6">
        <div>
          <h1 className="text-xl">{props.title}</h1>
          <p className="text-md opacity-70">{props.content}</p>
        </div>
        <div>
          <button
            className="cursor-pointer bg-neutral-800 text-white text-lg py-1 px-3 rounded-md"
            onClick={() => {
              setShowWindow(!showWindow)
            }}
          >
            {props.button}
          </button>
        </div>
      </div>
      <hr />

      {showWindow && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center backdrop-brightness-40">
          <div className="text-stone-700 flex flex-col rounded-lg bg-white p-8 w-[800px] h-fit opacity-100">
            <button
              className="w-full flex justify-end cursor-pointer"
              onClick={() => {
                setShowWindow(!showWindow)
              }}
            >
              <CgClose className="text-xl" />
            </button>
            <div className="flex flex-col gap-10">
              <h1 className="text-xl">{`Edit your ${props.title.toLowerCase()}`}</h1>
              <input
                type="text"
                id={props.title.replace(/\s+/g, "")}
                className="peer border bg-transparent w-full h-13 p-6 rounded-lg focus:border-neutral-800 focus:ring-0 focus:outline-hidden"
                defaultValue={props.content}
                placeholder={`Enter your ${props.title.toLowerCase()}`}
              />
              <button className="bg-neutral-800 text-white p-4 rounded-lg cursor-pointer w-full">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressFormEdit

