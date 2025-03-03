function UserProfile() {
  return (
    <div className="w-full h-screen px-32 flex flex-col items-center">
      <div className="w-full h-screen bg-cyan-300 ">
        <section className="left-section flex px-4 bg-sky-900 flex-col items-center justify-start w-1/3 h-full">
          <div className="card h-fit w-full rounded-xl bg-neutral-50 mt-8 flex flex-col ">
            {/* status indicator */}
            {/* <div className="w-full flex justify-end p-3 ">
              {true ? (
                <span className="bg-green-200 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded-full">
                  Online
                </span>
              ) : (
                <span className="bg-red-200 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded-full">
                  offline
                </span>
              )}
            </div> */}
            {/* profile and name */}
            <div className="flex items-center gap-10  px-6 pb-6 pt-6 ">
              <div className="profile h-38 w-38 bg-neutral-700 rounded-full items-center">
              <img className="w-full h-full p-1 rounded-full ring-3 ring-teal-600 object-cover " src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQgAgPpQ3XkIvdohs4895lMgXWc2otUhvFp07duEkuDxrPzZ84uos0qsCyF1PnCS6MY6D7glQrO_smPV5zb9ip5gA" alt="Bordered avatar"/>
              </div>
              <div className="user-details">
                <h1 className="text-2xl">username</h1>
                <p>{true ? "Host" : "guest"} </p>
              </div>
            </div>
            <hr className="opacity-25  h-0 border border-neutral-900 mb-2" />
            <div className="flex px-6 pb-2">
              <div>Joined <span>2 years</span> ago </div>
            </div>
          </div>
          <div className="card h-fit w-full rounded-xl bg-neutral-50 mt-4 flex flex-col ">
            <h1 className="p-2 text-xl">your confirm information</h1>
          </div>
        </section>
        <section className="right-section bg-sky-400 h-full"></section>
      </div>
    </div>
  );
}

export default UserProfile;
