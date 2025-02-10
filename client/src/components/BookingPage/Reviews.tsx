import { useState } from "react";

import {ReviewCard} from "./reviewsSubcomponents/exportreviewSubComponents"

export default function Reviews({ onclick }: any) {
  const [reviewCards,serReviewCards] = useState([
    {
      reviewerImage:
        "https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180",
      reviewerName: "Bibek samal",
      reviewerState: "Odisha",
      reviewerCountry: "India",
      reviewerOveralRating: 3,
      reviewerReviewUploadTime: "3 sept",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quibusdam sapiente quod autem, quia nihil nam quas rerum, rem voluptate a consequatur perferendis minima omnis veritatis quisquam, asperiores fugit porro.",
    },
    {
      reviewerImage:
        "https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180",
      reviewerName: "Bibek samal",
      reviewerState: "Odisha",
      reviewerCountry: "India",
      reviewerOveralRating: 3,
      reviewerReviewUploadTime: "3 sept",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quibusdam sapiente quod autem, quia nihil nam quas rerum, rem voluptate a consequatur perferendis minima omnis veritatis quisquam, asperiores fugit porro.",
    },
    {
      reviewerImage:
        "https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180",
      reviewerName: "Bibek samal",
      reviewerState: "Odisha",
      reviewerCountry: "India",
      reviewerOveralRating: 3,
      reviewerReviewUploadTime: "3 sept",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quibusdam sapiente quod autem, quia nihil nam quas rerum, rem voluptate a consequatur perferendis minima omnis veritatis quisquam, asperiores fugit porro.",
    },
    {
      reviewerImage:
        "https://tse3.mm.bing.net/th?id=OIP.zQ9s_pN5SoZLDeAFoM4jhQAAAA&pid=Api&P=0&h=180",
      reviewerName: "Bibek samal",
      reviewerState: "Odisha",
      reviewerCountry: "India",
      reviewerOveralRating: 3,
      reviewerReviewUploadTime: "3 sept",
      reviewContent:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius quibusdam sapiente quod autem, quia nihil nam quas rerum, rem voluptate a consequatur perferendis minima omnis veritatis quisquam, asperiores fugit porro.",
    },
  ]);
  return (
    <div className="w-full py-8 grid md:grid-cols-2 md:gap-4 border-t border-gray-300">
      {reviewCards.map((e: any) => {
        return (
          <>
            <ReviewCard
              onclick={onclick}
              reviewerImage={e.reviewerImage}
              reviewerName={e.reviewerName}
              reviewerState={e.reviewerState}
              reviewerCountry={e.reviewerCountry}
              reviewerOveralRating={e.reviewerOveralRating}
              reviewerReviewUploadTime={e.reviewerReviewUploadTime}
              reviewContent={e.reviewContent}
            ></ReviewCard>
            
          </>
        );
      })}
      <button
        onClick={() => {
          onclick();
        }}
        className=" bg-neutral-500 hover:bg-neutral-600 duration-150 text-white px-2 py-1 cursor-pointer  rounded-lg w-max  font-semibold"
      >
      All Reviews
      </button>
    </div>
  );
}

