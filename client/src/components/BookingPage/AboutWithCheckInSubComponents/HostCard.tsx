export default function HostCard({hostImage,hostName,hostExperienceYear}:any){
    return(
      <div className="owner py-8 border-b border-b-gray-300 flex flex-col gap-6 pl-">
            <div className="flex items-center">
              <div className="shrink-0">
                <img
                  className="w-14 h-14 rounded-full"
                  src={hostImage?hostImage:"https://a0.muscache.com/im/pictures/user/e349f69e-6f7f-4a69-98ef-391baafed14a.jpg?im_w=240&im_format=avif"}
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-lg font-medium  truncate ">{`Hosted by ${hostName}`}</p>
                <p className="text-lg  font-thin  truncat">
                  {`Superhost ${hostExperienceYear} years hosting`}
                </p>
              </div>
            </div>
          </div>
    )
  }
  