import { Key, MapPin, MessageSquare, MousePointer2, SprayCan, Tag } from "lucide-react"

type RatingType = {
    cleanliness: number,
    accuracy: number,
    checkIn: number,
    communication:number,
    value: number,
    location: number
    
}

const RatingSection = ({cleanliness,accuracy,checkIn,communication,location,value}:RatingType) => {
  return (
    <div className="py-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Rating highlights</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <SprayCan className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Cleanliness</span>
                      <span className="text-sm text-gray-500">
                        {cleanliness}
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{
                          width: `${cleanliness * 20}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <MousePointer2 className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Accuracy</span>
                      <span className="text-sm text-gray-500">
                        {accuracy}
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${accuracy * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Key className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Check-in</span>
                      <span className="text-sm text-gray-500">
                        {checkIn}
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${checkIn * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <MessageSquare className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Comm</span>
                      <span className="text-sm text-gray-500">
                        {communication}
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{
                          width: `${communication * 20}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <MapPin className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Location</span>
                      <span className="text-sm text-gray-500">
                        {location}
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${location * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Tag className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Value</span>
                      <span className="text-sm text-gray-500">
                        {value}
                      </span>
                    </div>
                    <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-1 bg-gray-700 rounded-full"
                        style={{ width: `${value * 20}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

  )
}

export default RatingSection
