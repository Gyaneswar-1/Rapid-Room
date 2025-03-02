import CompareTableComponent from "./CompareTableComponent";

const data = [
  { title: "Guest identity verification", rapidRoom: true, Competitors: true },
  { title: "Reservation screening", rapidRoom: true, Competitors: false },
  { title: "$3m USD damage protection", rapidRoom: true, Competitors: false },
  { title: "Art & valuables", rapidRoom: true, Competitors: false },
  { title: "Auto & boat", rapidRoom: true, Competitors: true },
  // {title:"Pet damage"	,rapidRoom:true,Competitors:false},
  // {title:"Income loss",rapidRoom:true,Competitors:false},
  // {title:"Deep cleaning",rapidRoom:true,Competitors:false},
  // {title:"$1m USD liability insurance",rapidRoom:true,Competitors:false},
  // {title:"24-hour safety line",rapidRoom:true,Competitors:true},
];

function CompareTable() {
  return (
    <div className="my-20  md:mx-20">
      <div className="header flex w-full justify-end my-8 px-6">
        <div className="flex gap-6  ">
          <h1 className="text-lg" >RapidRoom</h1>
          <h1 className="text-lg" >Competitors</h1>
        </div>
      </div>
      <div>
        {data.map((d, index) => {
          return <CompareTableComponent key={index} data={d} />;
        })}
      </div>
    </div>
  );
}

export default CompareTable;
