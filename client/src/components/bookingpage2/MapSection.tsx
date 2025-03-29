type mapType = {
    longitude: number,
    latitude: number,
    street: string,
    city: string,
    state: string,
    country: string
}

const MapSection = ({city,country,latitude,longitude,state,street}:mapType) => {
  return (
    <div className="mt-12 pb-12 border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold mb-6">Where you'll be</h2>
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              src={`https://www.google.com/maps?q=${longitude},${latitude}&hl=es;z=14&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hotel Location"
              className="w-full h-full"
            ></iframe>
          </div>
          <p className="mt-4 text-gray-600">
            {street}, {city},{" "}
            {state}, {country}
          </p>
        </div>
  )
}

export default MapSection
