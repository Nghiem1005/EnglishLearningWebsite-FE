import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { thunkStudentTypes } from "../../constants/thunkTypes";
import { useAuth } from "../../contexts/authProvider";
import { useQueryCustom } from "../../hooks";
import { userCommonService } from "../../services/user";

const links = [
  // {
  //   link: "/profile/public",
  //   name: "Hồ sơ công khai",
  // },
  {
    link: "/profile/edit-profile",
    name: "Thông tin",
  },
  {
    link: "/profile/edit-photo",
    name: "Ảnh đại diện",
  },
  {
    link: "/profile/edit-account",
    name: "Bảo mật tài khoản",
  },
  // {
  //   link: "/profile/close-account",
  //   name: "Khóa tài khoản",
  // },
];

const UserEditContainer = () => {
  const auth = useAuth();
  const {
    isLoading: isLoading,
    data: data,
    refetch: r1,
  } = useQueryCustom(thunkStudentTypes.GET_STUDENT, () =>
    userCommonService.getUser({ userId: auth?.user?.id })
  );

  if (isLoading) return;
  return (
    <div className="mt-10 gap-y-6 min-h-[76vh] max-w-[28rem] md:max-w-[42rem] lg:max-w-[50rem] xl:max-w-[65rem] 2xl:max-w-[70rem] mx-auto mb-10 flex flex-col md:flex-row ">
      <div className="w-full md:w-4/12 md:border md:border-gray-400">
        <div className="border-color gap-x-6 border-b-1 px-4 py-2 flex md:flex-col items-center md:justify-center">
          <img
            className="rounded-full h-24 w-24"
            src={
              data?.data?.data?.image ||
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            alt=""
          />
          <div className="md:text-center">
            <p className="font-semibold text-xl dark:text-gray-200">
              {data?.data?.data?.name}
            </p>
            <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
              {data?.data?.data?.email}
            </p>
          </div>
        </div>
        <ul className="flex flex-col">
          {links.map((link, index) => (
            <NavLink
              to={link.link}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#1eb2a6] text-white font-semibold"
                  : "bg-transparent text-[#1eb2a6]"
              }
            >
              <li className="px-2 py-2">{link.name}</li>
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-9/12 border md:border-l-[0] border-gray-400">
        <Outlet />
      </div>
    </div>
  );
};

export default UserEditContainer;
