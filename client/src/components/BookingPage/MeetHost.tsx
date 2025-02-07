
import {MeetHostCard, AboutHost} from "./meetHostSubcomponents/exportMeetHostSubComponents"

type meetHostpropType = {
  hostImage:string, hostName:string, totalReveiws:number, hostRating:number, hostExperienceYear:number, hostResponseRate:number
}

export default function MeetHost({hostImage, hostName, totalReveiws, hostRating, hostExperienceYear, hostResponseRate}:meetHostpropType) {
  return (
    <div className="py-8 border-t border-t-gray-300 flex flex-col gap-4 md:gap-8">
      <h1 className="text-xl font-bold tracking-wide">Meet your host</h1>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-2 ">
        <div className="">
          <MeetHostCard
          hostImage={hostImage}
             hostName={hostName}
             totalReveiws={totalReveiws}
             hostRating={hostRating}
             hostExperienceYear={hostExperienceYear}
            
          ></MeetHostCard>
        </div>
          <AboutHost hostResponseRate={hostResponseRate}></AboutHost>
      </div>
    </div>
  );
}

