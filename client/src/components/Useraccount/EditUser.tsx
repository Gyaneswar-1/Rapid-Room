import { CiUser } from "react-icons/ci";
import UserFormEdit from "./edituser/UserFormEdit";
import Breadcrumb from "./edituser/Breadcrumb";

const info = [
  { title: "Fullname", content: "Gyaneswar", button: "edit" },
  { title: "Email address", content: "gyan*******5.com", button: "edit" },
  { title: "phone number", content: "826****52", button: "add" },
];

function EditUser() {
  return (
    <div className="h-screen w-screen flex  justify-center">
      <div className=" w-full md:w-[1200px]  md:p-15 p-5 flex flex-col gap-2">
        <div>
          <Breadcrumb />
        </div>
        <h1 className="md:text-4xl text-[1.8rem] font-semibold">Edit Personal info</h1>
        <div>
          <div className="flex items-center md:justify-start justify-center pt-12">
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="image/*"
            />

            <label
              htmlFor="fileInput"
              className="w-36 h-36 flex items-center justify-center bg-neutral-200 rounded-full cursor-pointer hover:bg-neutral-300 transition-colors"
            >
              <CiUser className="text-gray-600 text-7xl" />
            </label>
          </div>
        </div>
        <div className="cards mt-18 flex flex-wrap justify-start gap-16 h-full md:w-4/5 w-full ">
          {info.map((e, index) => {
            return <UserFormEdit key={index} {...e} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default EditUser;








// model Users {
//   id               Int            @id @default(autoincrement())
//   fullName         String
//   email            String         @unique
//   password         Stringt
//   profileImage     String?
//   address          Address?       @relation(fields: [addressId], references: [id])
//   addressId        Int?
//   isHost           Boolean        @default(false)
//   hostExperience   Int?
//   hostRating       Int?           @default(5)
//   hostResponseRate Int?           @default(100)
//   ReservedRooms    Reservations[]
//   wishList         WishList[]
//   reviews          Review[]
//   listedHotels     Hotels[]
//   payments         Payments[]
//   createdAt        DateTime       @default(now())
// }

// model Address {
//   id        Int      @id @default(autoincrement())
//   street    String?
//   city      String?
//   state     String?
//   zipCode   String?
//   country   String?
//   longitude Decimal?
//   latitude  Decimal?
//   users     Users[]
//   hotels    Hotels[]
// }
