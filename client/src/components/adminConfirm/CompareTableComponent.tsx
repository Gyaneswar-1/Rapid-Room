import { BsCheck2, BsXLg } from "react-icons/bs";

interface CompareTableComponentProps {
  data: {
    title: string;
    rapidRoom: boolean;
    Competitors: boolean;
  };
}

function CompareTableComponent(data: CompareTableComponentProps) {
  return (
    <div>
      <hr className="opacity-35 border h-0.5 rounded-full bg-black" />
      <div className="flex w-full justify-between my-8 md:px-6">
        <div className="text-xl">{data.data.title}</div>
        <div className="flex md:gap-28 justify-evenly items-center w-52 pr-9">
          <div className=" md:text-xl text-md font-bold">
            {data.data.rapidRoom ? <div className=" text-green-500"><BsCheck2 /></div>  : <div className="text-red-500" ><BsXLg /></div> }
          </div>
          <div className=" md:text-xl text-md    font-bold">
            {data.data.Competitors ? <div className=" text-green-500"><BsCheck2 /></div>  : <div className="text-red-500" ><BsXLg /></div> }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareTableComponent;
