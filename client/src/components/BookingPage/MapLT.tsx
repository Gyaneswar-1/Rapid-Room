export default function MapLT({ longitude, latitude, className }: any) {
    console.log("here is the props");
    return (
      <iframe
        src={`https://www.google.com/maps?q=${longitude},${latitude}&hl=es;z=14&output=embed`}
        className={className}
      ></iframe>
    );
  }