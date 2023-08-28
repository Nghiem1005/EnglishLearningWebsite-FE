import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const links = [
  {
    link: "/home/my-courses/learning",
    name: "Tất cả khóa học",
  },
  {
    link: "/home/my-courses/favorite",
    name: "Khóa học Yêu thích",
  },
  {
    link: "/home/my-courses/self-study",
    name: "Tự luyện thi",
  },
];

const UserContainer = () => {
  return (
    <>
      <div className="h-[115px] md:h-[206px] lg:h-[230px] bg-[#1eb2a6] md:pt-[4.2rem]">
        <div className="max-w-[26rem] md:max-w-[40rem] lg:max-w-[60rem] 2xl:max-w-[80rem] mx-auto mb-10">
          <h1 className="text-[2rem] md:text-[3rem] lg:text-[4rem] mb-6 text-white font-bold">
            Khóa học của tôi
          </h1>
          <div>
            <ul className="flex bg-[#1eb2a6] gap-x-[20px] transition-none">
              {links.map((link, index) => (
                <li
                  key={index}
                  className="text-white font-[500] cursor-pointer hover:text-[#1eb2a6] transition-none" 
                >
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-white text-[20px] font-bold py-2 border-b-[8px] border-white"
                        : "text-white text-[20px] font-bold"
                    }
                    to={link.link}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="my-6 max-w-[26rem] md:max-w-[40rem] lg:max-w-[60rem] 2xl:max-w-[80rem] mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default UserContainer;
