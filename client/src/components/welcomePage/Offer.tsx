import Tajmahal from "../../assets/welcomepage/Tajmahal.jpg"
import Paris from "../../assets/welcomepage/Paris.jpg"
import WhiteHotel from "../../assets/welcomepage/WhiteHotel.webp"
function Offer() {
  return (
    <div className="h-max  ">
      <h1 className="text-4xl md:font-normal font-semibold text-center md:pt-20 pt-8">Best Offers At</h1>
      <div className="offers-page h-max w-full bg-white">
        <div className="cards flex  items-center justify-center py-12 md:gap-26 gap-12 flex-wrap ">
          <div className="card1  flex flex-col items-center  w-full md:w-max  h-fit md:px-0 px-2">
          <img src={Tajmahal} alt="" className="w-full md:w-60 h-60 object-cover rounded-xl" />
          <h1 className="font-bold text-2xl p-2">India</h1>
          <p className="p-2 pt-0 text-center"> pakistan srilanka nepal bhutan </p>
          </div>
          <div className="card1  flex flex-col items-center w-full md:w-max  h-fit px-2">
          <img src={Paris} alt="" className="w-full md:w-60 h-60 object-cover rounded-xl" />
          <h1 className="font-bold text-2xl p-2">France </h1>
          <p className="p-2 pt-0 text-center"> Belgium Luxembourg Germany </p>
          </div>
          <div className="card1  flex flex-col items-center w-full md:w-max h-fit px-2">
          <img src={WhiteHotel} alt="" className="w-full md:w-60 h-60 object-cover rounded-xl" />
          <h1 className="font-bold text-2xl p-2">thailand </h1>
          <p className="p-2 pt-0 text-center"> laos Myanmar Vietnam  </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
