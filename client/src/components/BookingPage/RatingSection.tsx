import {
  OveralRating,
  SpceficRating,
} from "./ratingSubComponents/exportRatingSubComponents";

type ratingPropType = {
  overalRating: Number;
  cleanlinessRating: Number;
  accuracyRating: Number;
  checkInRating: Number;
  communicationRating: Number;
  locationRating: Number;
  valueRating: Number;
  parkingRating: Number;
};

export default function RatingSection({
  overalRating,
  cleanlinessRating,
  accuracyRating,
  checkInRating,
  communicationRating,
  locationRating,
  valueRating,
  parkingRating,
}: ratingPropType) {
  return (
    <div className="border-t border-gray-300 py-8 flex flex-col  gap-14">
      <OveralRating overalRating={overalRating}></OveralRating>
      <SpceficRating
        cleanlinessRating={cleanlinessRating}
        accuracyRating={accuracyRating}
        checkInRating={checkInRating}
        communicationRating={communicationRating}
        locationRating={locationRating}
        valueRating={valueRating}
        parkingRating={parkingRating}
      ></SpceficRating>
    </div>
  );
}
