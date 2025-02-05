import MapLT from "./MapLT";
export default function MapShowcase() {
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
            longitude="20.684607359715745"
            latitude="86.16374122241754"
            className="w-full h-full rounded-xl"
          ></MapLT>
        </div>
        <button className="px-4 py-2 bg-neutral-500 hover:bg-neutral-600 duration-150 w-max rounded-xl text-white">
          Show more
        </button>
      </div>
    );
  }