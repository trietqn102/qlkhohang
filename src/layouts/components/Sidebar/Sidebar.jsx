import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { NavLink } from "react-router-dom";
import routes from "~/config/routes";

function Sidebar() {
  return (
    <div
      className={`w-1/12 h-[94vh] flex flex-col  fixed mt-20 items-center text-xl bg-[#008080] text-white`}
    >
      <NavLink
        to={routes.home}
        className={({ isActive, isPending }) =>
          `${
            isPending ? "pending" : isActive ? " bg-neutral-300/20" : ""
          } flex px-10 py-6 w-full hover:bg-neutral-300/20`
        }
      >
        Dashboard
      </NavLink>
      <NavLink
        to={routes.export}
        className={({ isActive, isPending }) =>
          `${
            isPending ? "pending" : isActive ? " bg-neutral-300/20" : ""
          } flex px-10 py-6 w-full hover:bg-neutral-300/20`
        }
      >
        Xuất kho
      </NavLink>
      <NavLink
        to={routes.import}
        className={({ isActive, isPending }) =>
          `${
            isPending ? "pending" : isActive ? " bg-neutral-300/20" : ""
          } flex px-10 py-6 w-full hover:bg-neutral-300/20`
        }
      >
        Nhập kho
      </NavLink>
      <NavLink
        to={routes.dataWarehouse}
        className={({ isActive, isPending }) =>
          `${
            isPending ? "pending" : isActive ? " bg-neutral-300/20" : ""
          } flex px-10 py-6 w-full hover:bg-neutral-300/20`
        }
      >
        Dữ liệu kho
      </NavLink>

      <NavLink
        to={routes.managerUser}
        className={({ isActive, isPending }) =>
          `${
            isPending ? "pending" : isActive ? " bg-neutral-300/20" : ""
          } flex px-10 py-6 w-full hover:bg-neutral-300/20`
        }
      >
        Người dùng
      </NavLink>

      <NavLink
        to={routes.user}
        className={({ isActive, isPending }) =>
          `${
            isPending ? "pending" : isActive ? "text-red-500" : ""
          } flex justify-center px-10 py-6 w-full hover:bg-neutral-300/20 absolute bottom-0`
        }
      >
        <MdOutlineAdminPanelSettings size={30} className="mr-2" />
      </NavLink>
    </div>
  );
}

export default Sidebar;
