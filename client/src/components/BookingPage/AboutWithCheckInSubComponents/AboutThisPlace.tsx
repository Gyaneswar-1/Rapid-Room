export default function AboutThisPlace({aboutThisPlace}:any){
    return(
      <div className="about md:py-8 border-b border-b-gray-300 flex flex-col gap-4">
            <h1 className="font-semibold text-2xl tracking-wide">
              About this place
            </h1>
            <p className="text-lg font-thin tracking-wide">
              {aboutThisPlace}
            </p>
          </div>
    )
  }
  