import { Star } from "lucide-react";

type meetHostType = {
  profileImage: string;
  fullName: string;
  hostExperience: number;
  hostRating: number;
  totalReviews: number;
  hostResponseRate: number;
};

const MeetYourHost = ({
  profileImage,
  hostResponseRate,
  fullName,
  hostExperience,
  hostRating,
  totalReviews,
}: meetHostType) => {
  return (
    <div className="py-6 border-b border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Meet your host</h2>
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <div className="h-20 w-20 rounded-full overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt={fullName}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-2xl font-semibold">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{fullName}</h3>
          <p className="text-gray-500">Host for {hostExperience} years</p>
          <div className="flex items-center mt-2">
            <Star className="h-4 w-4 mr-1 fill-current text-yellow-500" />
            <span>
              {hostRating} • {totalReviews} reviews
            </span>
          </div>
          <p className="mt-2 text-sm">Response rate: {hostResponseRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default MeetYourHost;
