export default function MapLT({ longitude, latitude, className }: {longitude:number,latitude:number, className: string}) {
    
    return (
      <iframe
        src={`https://www.google.com/maps?q=${longitude},${latitude}&hl=es;z=14&output=embed`}
        className={className}
      ></iframe>
    );
  }