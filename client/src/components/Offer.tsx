
function Offer() {
  return (
    <div className="h-[540px]">
      <h1 className="text-4xl text-center pt-20 ">Best Offers At</h1>
      <div className="offers-page h-80 w-full bg-white ">
        <div className="cards flex items-center justify-center p-12 gap-26 flex-wrap">
          <div className="card1 flex flex-col items-center w-60 h-fit">
          <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D" alt="" className="w-60 h-60 object-cover rounded-xl" />
          <h1 className="font-bold text-2xl p-2">India </h1>
          <p className="p-2 pt-0"> pakistan srilanka nepal bhutan </p>
          </div>
          <div className="card2 flex flex-col items-center  w-60 h-fit">
          <img src="https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg" alt="" className="w-60 h-60 object-cover rounded-xl" />
          <h1 className="font-bold text-2xl p-2">France </h1>
          <p className="p-2 pt-0"> Belgium Luxembourg Germany  </p>
          </div>
          <div className="card1 flex flex-col items-center  w-60 h-fit">
          <img src="https://th-thumbnailer.cdn-si-edu.com/tbttRo0rl0IvKYfsrHXAaoxeMwU=/fit-in/1072x0/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/2e/a2/2ea2429f-a9d9-45e6-8448-f292a387b289/istock-504240406.jpg" alt="" className="w-60 h-60 object-cover rounded-xl" />
          <h1 className="font-bold text-2xl p-2">thailand </h1>
          <p className="p-2 pt-0"> laos Myanmar Vietnam  </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Offer;
