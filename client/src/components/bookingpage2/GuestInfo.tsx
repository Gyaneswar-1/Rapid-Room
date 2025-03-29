type hostInfoType = {
    profileImage: string,
    fullName: string,
    roomType: string,
    numberOfGuests: number
}
const GuestInfo = ({fullName, numberOfGuests, profileImage, roomType}:hostInfoType) => {
  return (
    <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full overflow-hidden">
                <img
                  src={profileImage || "/placeholder.svg"}
                  alt={fullName}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {roomType} hosted by {fullName}
                </p>
                <p className="text-gray-500">
                  {numberOfGuests} guests
                </p>
              </div>
            </div>
  )
}

export default GuestInfo
