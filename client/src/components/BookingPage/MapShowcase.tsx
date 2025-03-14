import MapLT from "./MapLT";
type mapPropType = {
  longitude: number,
  latitude: number,
  country: string,
  city: string,
  state: string,
  street: string,
} 

export default function MapShowcase({longitude,latitude,country,city,state,street}:mapPropType) {
    return (
      <div className="py-8 border-t border-gray-300 flex flex-col gap-6">
        <div className="texts flex flex-col gap-2">
          <h1 className="text-xl font-bold">Where you’ll be</h1>
          <p className="text-lg font-thin">
            {`${street}, ${city}, ${state}, ${country}`}
          </p>
        </div>
        <div className="map  md:h-96 rounded-xl">
          <MapLT
            longitude={longitude}
            latitude={latitude}
            className="w-full h-full rounded-xl"
          ></MapLT>
        </div>
        <button className="px-4 py-2 bg-neutral-500 hover:bg-neutral-600 duration-150 w-max rounded-xl text-white"
        onClick={()=>{window.open(`https://www.google.com/maps?q=${longitude},${latitude}&hl=es;z=14&output=embed`)}}
        >
          Show more
        </button>
      </div>
    );
  }