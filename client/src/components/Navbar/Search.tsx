import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setSearch } from "../../store/reducers/search.reducer";
import { AppDispatch } from "../../store/store";

function Search() {
  //for temporary serch purpose
  // const { search} = useSelector(
  //   (state: RootState) => state.searchReducer
  // );
  const dispatch: AppDispatch = useDispatch();
  const [searchValue,setSearchValue] = useState("");
  return (
    <div
      className="
    border-[1px]
    w-full
    md:w-auto
    py-2
    rounded-full
    shadow-sm
    hover:shadow-sm
    transition
    cursor-pointer

    "
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Anywhere</div>
        <div
          className="
            hidden
            sm:block
            text-sm font-semibold px-6 border-x-[1px] flex-1 text-center "
        >
          anyWeek
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3 ">
          {/* <div className="hidden sm:block border">add Guests</div> */}
          {/* for temporary serch purpose */}
          <input
            type="text"
            className="hidden sm:block outline-none bg-transparent"
            placeholder="Search place"
            onChange={(e)=>{
                setSearchValue(e.target.value);
            }}
            />
          <div
            onClick={() => {
              
                dispatch(setSearch(searchValue));
            }}
            className="p-2 bg-cyan-600 rounded-full text-white"
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
