import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import Card from "../components/Card";
import Navbar from "../components/Navbar/Navbar";
import { getHotels } from "../service/getHotels.service";
import { useNavigate } from "react-router-dom";

interface Address {
  country: string;
  city: string;
}

export interface Hotel {
  id: number;
  hotelName: string;
  perNight: number;
  type: string;
  address: Address;
  // images: string[];
  image: string;
  onclick: ()=> void;
}

function Home({ data }: any) {
  const [hotelsData, setHotelsData] = useState<Hotel[]>([]);
  const navigate = useNavigate();

  async function getHotelsData() {
    const result = await getHotels(1, 10);
    setHotelsData(result.hotels);
    console.log(hotelsData);
  }

  useEffect(() => {
    getHotelsData();
  }, []);

  return (
    <div className="h-screen w-full   bg-neutral-200">
      <Navbar />
      <div className="w-full h-full pt-[196px] flex justify-center">
        <div className="flex w-[90rem] gap-8 flex-wrap justify-evenly h-fit">
          {/* <Card
            image={
              "https://a0.muscache.com/im/pictures/454710cc-6052-4669-9019-d347e87d9a26.jpg?im_w=1200&im_format=avif"
            }
          /> */}

          {hotelsData.map((data, index) => {
            return (
              <Card
                id={data.id}
                key={index}
                //  image={data.images}
                hotelName={data.hotelName}
                perNight={data.perNight}
                type={data.type}
                address={data.address}
                image={
                  "https://a0.muscache.com/im/pictures/454710cc-6052-4669-9019-d347e87d9a26.jpg?im_w=1200&im_format=avif"
                }
                onclick={()=>{navigate(`/book-hotel?hotelId=${data.id}`)}}
              />
            );
          })}
        </div>
        <BottomNav />
      </div>
    </div>
  );
}

export default Home;

{
  /* <Card
  image={
    "https://a0.muscache.com/im/pictures/1ab29317-e49b-494f-b25c-d8883e98795a.jpg?im_w=1200&im_format=avif"
  }
/>
<Card
  image={
    "https://a0.muscache.com/im/pictures/miso/Hosting-52466292/original/89cc2a1a-f95d-4a66-bca3-a6f68c410640.jpeg?im_w=1440&im_format=avif"
  }
/>
<Card
  image={
    "https://a0.muscache.com/im/pictures/d2b6be35-0b3f-47d6-b6a8-e9d9a44f62e9.jpg?im_w=1200&im_format=avif"
  }
/>
<Card
  image={
    "https://a0.muscache.com/im/pictures/miso/Hosting-1049733190500047152/original/5551c262-55d1-4a2d-94f0-f0ad98ce468f.jpeg?im_w=1200&im_format=avif"
  }
/>
<Card
  image={
    "https://a0.muscache.com/im/pictures/miso/Hosting-885171494011814801/original/e233d639-b034-4888-bdb1-72fcd49c459a.jpeg?im_w=1200&im_format=avif"
  }
/>
<Card
  image={
    "https://a0.muscache.com/im/pictures/b271226e-9453-4d73-aac0-1622550b08e4.jpg?im_w=1200&im_format=avif"
  }
/>
<Card
  image={
    "https://a0.muscache.com/im/pictures/miso/Hosting-47856212/original/7d09bbd6-bd43-4c6d-a75e-51ef0c78129f.jpeg?im_w=1200&im_format=avif"
  }
/> */
}
