import Breadcrumb from "../../components/Useraccount/edituser/Breadcrumb";
// import UserFormEdit from "../../components/Useraccount/EditUser/UserFormEdit";

const info = [
  { title: "Fullname", content: "Gyaneswar", button: "edit" },
  { title: "Email address", content: "gyan*******5.com", button: "edit" },
  { title: "phone number", content: "826****52", button: "add" },
];

function PersonalAddress() {
  return (
    <div className="h-screen w-screen flex  justify-center">
      <div className=" w-[1200px]  p-15 flex flex-col gap-2">
        <div>
          <Breadcrumb />
        </div>
        <h1 className="text-4xl font-semibold">Edit Personal Address</h1>
      </div>
    </div>
  );
}

export default PersonalAddress;
