type aboutHostProp = {
  hostName: string,
  hostResponseRate: number
}
export default function AboutHost({hostName, hostResponseRate}:aboutHostProp){
    return(
      <div className=" lg:col-span-2 flex flex-col  items-start justify-center pl-12 gap-6">
            <div className="info flex flex-col gap-2">
              <div className="name text-xl font-bold">{hostName}</div>
              <p className="text-lg font-semibold">
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </p>
            </div>
  
            <div className="hostdetail flex flex-col gap-2">
              <h1 className="text-xl font-bold">Host details</h1>
              <div>
                <p className="text-lg font-semibold">{`Response rate: ${hostResponseRate}`}</p>
                <p className="text-lg font-semibold">Responds within an hour</p>
              </div>
            </div>
            <button className="text-xl font-semibold text-white bg-neutral-500 hover:bg-neutral-600 duration-150 px-4 py-2 rounded-lg w-max">
              Message Host
            </button>
          </div>
    )
  }