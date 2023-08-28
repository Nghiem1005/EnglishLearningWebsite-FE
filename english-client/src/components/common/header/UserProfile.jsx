import React from "react";
import { Link } from "react-router-dom";


const UserProfile = ({
  showNavProfile,
  setShowNavProfile,
  userData,
  logout,
}) => {
  const links = [
    {
      link: "/home/my-courses/learning",
      name: "Khóa học của tôi",
    },
    {
      link: `/user-blog/user/${userData?.id}/blog/list`,
      name: "Blog của tôi",
    },
    {
      link: "/user/edit-account",
      name: "Hồ sơ",
    },
    {
      link: "/user/purchase-history",
      name: "Lịch sử giao dịch",
    },
  ];

  return (
    <div
      id="click"
      className={
        showNavProfile
          ? "block absolute right-6 top-16 z-[1000] mt-3 w-60 origin-top-right rounded-sm bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          : "hidden"
      }
    >
      <div className="flex gap-2 items-center border-color border-b-1 px-4 py-2">
        <img
          className="rounded-full h-20 w-20"
          src={
            userData?.image ||
            "https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg"
          }
          alt="user-profile"
        />
        <div className="break-words">
          <p className="font-semibold text-sm dark:text-gray-200">
            {userData?.name}
          </p>
          <p className="text-gray-500 text-sm font-semibold break-all dark:text-gray-400">
            {userData?.email}
          </p>
        </div>
      </div>
      <span className="border-t w-full block"></span>
      {links.map((link, index) => (
        <Link to={link.link} key={index}>
          <span
            className="block px-4 py-2 text-sm text-gray-700 hover:text-[#1eb2a6]"
            role="menuitem"
            onClick={() => setShowNavProfile(false)}
          >
            {link.name}
          </span>
        </Link>
      ))}
      <span className="border-t w-full block"></span>
      <button
        className="block px-4 py-2 text-sm text-gray-700 hover:text-[#1eb2a6]"
        onClick={logout}
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default UserProfile;
