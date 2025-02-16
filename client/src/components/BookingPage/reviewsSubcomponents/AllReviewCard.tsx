import { FaStar } from "react-icons/fa";

type AllReviewCardProp = {
  reviewerImage: string,
  reviewerName: string,
  reviewerState :string,
  reviewerCountry: string,
  reviewerOveralRating:number,
  reviewerReviewUploadTime: string,
  reviewContent: string,
}

export default function AllReviewCard({
  reviewerImage,
  reviewerName,
  reviewerState,
  reviewerCountry,
  reviewerOveralRating,
  reviewerReviewUploadTime,
  reviewContent,
}: AllReviewCardProp) {
  return (
    <div className="card flex flex-col gap-2 ">
      <div className="flex items-center">
        <div className="shrink-0">
          <img
            className="w-12 h-12 rounded-full object-cover object-center"
            src={
              reviewerImage
                ? reviewerImage
                : "https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180"
            }
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-lg font-medium  truncate ">{reviewerName}</p>
          <p className="text-sm  font-thin  truncat">{`${reviewerState}, ${reviewerCountry}`}</p>
        </div>
      </div>
      <div className="stars flex gap-2 items-center  font-semibold">
        <div className="flex">
          {[...Array(reviewerOveralRating)].map((_, index) => (
            <FaStar className="text-neutral-500" key={index}></FaStar>
          ))}
        </div>
        {reviewerReviewUploadTime}
      </div>
      <div className="con  md:h-24 w-full overflow-hidden">
        {reviewContent}
      </div>
    </div>
  );
}
