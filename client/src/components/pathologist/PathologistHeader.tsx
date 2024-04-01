import { TbSearch, TbMoon, TbBell } from "react-icons/tb";

const PathologistHeader = () => {
  return (
    <>
      <div className=" justify-end bg-[#F2F2F2] flex items-center p-3 fixed top-0 w-full z-10">
        <div className="bg-white flex items-center p-2 mr-40 w-1/2 rounded-full justify-between focus:outline-none">
          <input type="text" placeholder="Search" className="ml-2 flex-grow" />
          <TbSearch className="mr-2" />
        </div>

        <div className="flex items-center">
          <TbMoon className="text-black mx-2 text-xl" />
          <TbBell className="text-black mx-2 text-xl" />
          <div className="border-r border-gray-400 h-6 mx-2"></div>
          <div className="flex items-center ml-2 mr-2">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
              <img
                src="/src/assets/pfp.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-black ">John Doe</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PathologistHeader;
