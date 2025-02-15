
type bookingPageImagesType = {
  img1: string,
  img2: string,
  img3: string,
  img4: string,
  img5: string
}

/**
 * "https://a0.muscache.com/im/pictures/airflow/Hosting-20351538/original/a37e8b2a-1910-49ad-a556-e55e8ef6b920.jpg?im_w=1200&im_format=avif"
 * 
 * "https://a0.muscache.com/im/pictures/airflow/Hosting-20351538/original/d73491b8-7d65-4c8f-b18d-4c22ae3c4221.jpg?im_w=720&im_format=avif"
              className="w-full h-full object-center object-cover rounded-lg"

 * "https://a0.muscache.com/im/pictures/airflow/Hosting-20351538/original/6d6c1f55-7b87-4022-9790-04a135d2d4e9.jpg?im_w=720&im_format=avif"
                className="w-full h-full object-center object-cover rounded-lg"
                "https://a0.muscache.com/im/pictures/f3d7c1c4-842f-4958-9212-c72442bdd887.jpg?im_w=720&im_format=avif"
                "https://a0.muscache.com/im/pictures/2aa60ac4-9f33-46ee-8bfc-3e8ec28a2f08.jpg?im_w=720&im_format=avif"

 */




export default function BookingPageImages({img1,img2, img3, img4, img5}:bookingPageImagesType) {
    return (
      <div className="md:h-4/7 h-1/3 overflow-hidden md:max-h-4/7 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2 ">
        <img
          className="h-full max-w-full md:rounded-lg object-center object-fill "
          src={img1?img1:"https://a0.muscache.com/im/pictures/airflow/Hosting-20351538/original/a37e8b2a-1910-49ad-a556-e55e8ef6b920.jpg?im_w=1200&im_format=avif"}
          alt=""
        />
        <div className="h-full  rounded-lg hidden md:flex flex-col gap-2">
          <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-2">
            <img
              src={img2?img2:"https://a0.muscache.com/im/pictures/airflow/Hosting-20351538/original/d73491b8-7d65-4c8f-b18d-4c22ae3c4221.jpg?im_w=720&im_format=avif"}
              className="w-full h-full object-center object-cover rounded-lg"
              alt=""
            />
            <div className=" rounded-lg bg-gray-500">
              <img
                src={img3?img3:"https://a0.muscache.com/im/pictures/airflow/Hosting-20351538/original/6d6c1f55-7b87-4022-9790-04a135d2d4e9.jpg?im_w=720&im_format=avif"}
                className="w-full h-full object-center object-cover rounded-lg"
                alt=""
              />
            </div>
          </div>
          <div className="grid h-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-2">
            <div className="  rounded-lg bg-gray-500">
              <img
                src={img4?img4:"https://a0.muscache.com/im/pictures/f3d7c1c4-842f-4958-9212-c72442bdd887.jpg?im_w=720&im_format=avif"}
                className="w-full h-full object-center object-cover rounded-lg"
                alt=""
              />
            </div>
            <div className=" rounded-lg bg-gray-500">
              <img
                src={img5?img5:"https://a0.muscache.com/im/pictures/2aa60ac4-9f33-46ee-8bfc-3e8ec28a2f08.jpg?im_w=720&im_format=avif"}
                className="w-full h-full object-center object-cover rounded-lg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    );
  }