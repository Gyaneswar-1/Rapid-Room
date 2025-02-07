import MapLT from "./MapLT";
type mapPropType = {
  longitude: number,
  latitude: number,
}

export default function MapShowcase({longitude,latitude}:mapPropType) {
    return (
      <div className="py-8 border-t border-gray-300 flex flex-col gap-6">
        <div className="texts flex flex-col gap-2">
          <h1 className="text-xl font-bold">Where you’ll be</h1>
          <p className="text-lg font-thin">
            Pulau Seribu, Jakarta, Jakarta, Indonesia
          </p>
        </div>
        <div className="map  md:h-96 rounded-xl">
          <MapLT
            longitude={longitude}
            latitude={latitude}
            className="w-full h-full rounded-xl"
          ></MapLT>
        </div>
        <button className="px-4 py-2 bg-neutral-500 hover:bg-neutral-600 duration-150 w-max rounded-xl text-white">
          Show more
        </button>
      </div>
    );
  }