import { NavLink } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";
import { IoCreate } from "react-icons/io5";
import { IoIosSettings } from "react-icons/io";
const Sidebar = () => {
  return (
   <div className="border-r-2 h-screen">
     <div className="flex flex-col gap-8 ml-6  cursor-pointer mr-3  ">
      <div className="flex gap-2 items-center mt-7  ">
        <MdDashboard size={30} color={"black"} />
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-300 text-md" : ""
          }
        >
          Dashboard
        </NavLink>
      </div>
      <div className="flex gap-2 items-center ">
        <MdOutlinePreview size={30} color={"black"} />
        <NavLink
          to="view"
          className={({ isActive }) =>
            isActive ? "text-green-300 text-md" : ""
          }
        >
          View
        </NavLink>
      </div>
      <div className="flex gap-2 items-center ">
        <IoCreate size={30} color={"black"} />
        <NavLink
          to="create"
          className={({ isActive }) =>
            isActive ? "text-green-300 text-md" : ""
          }
        >
          Create
        </NavLink>
      </div>
      <div className="flex gap-2 items-center ">
        <IoIosSettings size={30} color={"black"} />
        <NavLink
          to="setting"
          className={({ isActive }) =>
            isActive ? "text-green-300 text-md" : ""
          }
        >
          Setting
        </NavLink>
      </div>
    </div>
   </div>
  );
};

export default Sidebar;
