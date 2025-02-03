import Card from "../components/Card";
import Navbar from "../components/Navbar/Navbar";

function Home({ data }: any) {
  return (
    <div className="h-full w-full   bg-neutral-200">
      <Navbar/>
    <div className="w-full h-full pt-60 flex justify-center">
    <div className="flex w-[90rem] gap-8 flex-wrap justify-evenly h-fit">
        <Card image={"https://a0.muscache.com/im/pictures/1ab29317-e49b-494f-b25c-d8883e98795a.jpg?im_w=1200&im_format=avif"} />
        <Card image={"https://a0.muscache.com/im/pictures/miso/Hosting-52466292/original/89cc2a1a-f95d-4a66-bca3-a6f68c410640.jpeg?im_w=1440&im_format=avif"} />
        <Card image={"https://a0.muscache.com/im/pictures/d2b6be35-0b3f-47d6-b6a8-e9d9a44f62e9.jpg?im_w=1200&im_format=avif"} />
        <Card image={"https://a0.muscache.com/im/pictures/miso/Hosting-1049733190500047152/original/5551c262-55d1-4a2d-94f0-f0ad98ce468f.jpeg?im_w=1200&im_format=avif"} />
        <Card image={"https://a0.muscache.com/im/pictures/miso/Hosting-885171494011814801/original/e233d639-b034-4888-bdb1-72fcd49c459a.jpeg?im_w=1200&im_format=avif"} />
        <Card image={"https://a0.muscache.com/im/pictures/b271226e-9453-4d73-aac0-1622550b08e4.jpg?im_w=1200&im_format=avif"} />
        <Card image={"https://a0.muscache.com/im/pictures/miso/Hosting-47856212/original/7d09bbd6-bd43-4c6d-a75e-51ef0c78129f.jpeg?im_w=1200&im_format=avif"} />
        <Card image={"https://a0.muscache.com/im/pictures/454710cc-6052-4669-9019-d347e87d9a26.jpg?im_w=1200&im_format=avif"} />
      </div>
    </div>
    </div>
  );
}

export default Home;
