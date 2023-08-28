import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel, MdOutlineSupportAgent } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { AiOutlineComment, AiOutlineShoppingCart } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { FaErlang } from "react-icons/fa";
import { VscNotebookTemplate } from "react-icons/vsc";
import { ImProfile } from "react-icons/im";
import { RiContactsBookLine } from "react-icons/ri";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { useStateContext } from "../contexts/ContextProvider";

export const links = [
  // {
  //   title: "Dashboard",
  //   links: [
  //     {
  //       link: "home",
  //       name: "Thống kê",
  //       icon: <FiShoppingBag />,
  //     },
  //   ],
  // },

  {
    title: "Quản lí",
    links: [
      {
        link: "course",
        name: "Khóa Học",
        icon: <VscNotebookTemplate />,
      },
      {
        link: "teacher",
        name: "Giảng viên",
        icon: <VscNotebookTemplate />,
      },
      {
        link: "lesson",
        name: "Tiết học",
        icon: <GiNotebook />,
      },
      {
        link: "student",
        name: "Học viên",
        icon: <RiContactsBookLine />,
      },
      {
        link: "feedback-course",
        name: "Đánh giá khóa học",
        icon: <AiOutlineComment />,
      },
      {
        link: "discount",
        name: "Phiếu giảm giá",
        icon: <BiPurchaseTagAlt />,
      },
      { link: "bills", name: "Doanh thu", icon: <AiOutlineShoppingCart /> },
      {
        link: "message-support",
        name: "Trung tâm hỗ trợ",
        icon: <MdOutlineSupportAgent />,
      },
    ],
  },
  {
    title: "Cá nhân",
    links: [
      {
        link: "profile",
        name: "Quản lí thông tin",
        icon: <ImProfile />,
      },
    ],
  },
];

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <FaErlang /> <span>E-Academy</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.link}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
