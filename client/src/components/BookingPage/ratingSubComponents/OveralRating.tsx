export default function OveralRating({overalRating}:any){
    return (
      <div className="pt1 w-full flex flex-col items-center justify-center  text-center">
          <div className="rating flex items-top ">
            <img
              className="h-42"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/78b7687c-5acf-4ef8-a5ea-eda732ae3b2f.png"
              alt=""
            />
            <h1 className="font-bold text-8xl">{overalRating}</h1>
            <img
              className="h-42"
              src="https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-GuestFavorite/original/b4005b30-79ff-4287-860c-67829ecd7412.png"
              alt=""
            />
          </div>
          <div className="texts flex flex-col gap-2 md:w-1/4 ">
            <div className="title text-2xl font-bold">Guest favourite</div>
            <div className="content text-lg font-thin">
              This home is a guest favourite based on ratings, reviews and
              reliability
            </div>
          </div>
        </div>
    )
  }