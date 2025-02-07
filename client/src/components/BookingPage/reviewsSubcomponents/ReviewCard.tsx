import { FaStar } from "react-icons/fa";

export default function ReviewCard({
  onclick,
  reviewerImage,
  reviewerName,
  reviewerState,
  reviewerCountry,
  reviewerOveralRating,
  reviewerReviewUploadTime,
  reviewContent,
}: any) {
  return (
    <div className="card flex flex-col gap-2  cursor-pointer">
      <div className="flex items-center">
        <div className="shrink-0">
          <img
            className="w-12 h-12 rounded-full"
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
      <div className="stars flex gap-2  font-semibold">
        <div className="flex">
          {[...Array(reviewerOveralRating)].map((_, index) => (
            <FaStar key={index}></FaStar>
          ))}
        </div>
        {reviewerReviewUploadTime}
      </div>
      <div className="con border md:h-24 w-full overflow-hidden">{reviewContent}
      </div>
      <button
        onClick={() => {
          onclick();
        }}
        className="px-2 py-1 bg-neutral-500 hover:bg-neutral-600 duration-150 text-white rounded-lg w-max  font-semibold"
      >
        Show more
      </button>
    </div>
  );
}