import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useWindowResize } from "../../../hooks";
import Head from "./Head";
import "./header.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserProfile from "./UserProfile";
import { useAuth } from "../../../contexts/authProvider";
import { userService } from "../../../services/user";

const links = [
  {
    link: "/",
    name: "Trang chủ",
  },
  {
    link: "/courses",
    name: "Khóa học",
  },
  {
    name: "Về chúng tôi",
    children: [
      {
        link: "/about",
        name: "Về chúng tôi",
      },
      {
        link: "/team",
        name: "Đội ngũ",
      },
      {
        link: "/blog",
        name: "Blog",
      },
      {
        link: "/pricing",
        name: "Khám phá",
      },
    ],
  },
  {
    link: "/contact",
    name: "Kết nối",
  },
  {
    link: "/user-blog/list  ",
    name: "Blog",
  },
  {
    link: "/flashcard",
    name: "Flashcards",
  },
  {
    link: "/test/history",
    name: "Luyện thi",
  },
];

const Header = () => {
  const [click, setClick] = useState(false);
  const [showNavChildren, setShowNavChildren] = useState(false);
  const [showNavProfile, setShowNavProfile] = useState(false);
  const ref = useRef();
  const refChildren = useRef();
  const auth = useAuth();
  const { width } = useWindowResize();

  useEffect(() => {
    if (showNavChildren) {
      refChildren.current.style.left = `${ref.current.offsetLeft + 20}px`;
    }
  }, [width, showNavChildren]);

  const logout = () => {
    auth.logoutUser();
    window.location = window.location;
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flex md:justify-between items-center relative justify-between md:flex-row md:h-auto">
          <div className="flex">
            <div className="start-end lg:inline-block hidden">
              <div className="button-custom">ĐÀO TẠO LẤY CHỨNG CHỈ</div>
            </div>
            <ul
              className={
                click
                  ? "mobile-nav pl-6 md:flex lg:items-center lg:gap-x-5 md:gap-4 items-center pt-10 md:pt-0 grid gap-0 grid-flow-row"
                  : "flexSB " + "md:pl-6"
              }
              onClick={() => setClick(false)}
            >
              {links.map((link, index) => (
                <li
                  key={index}
                  className="text-[#134d48] font-[500] cursor-pointer hover:opacity-70 md:hover:text-[#1eb2a6] transition duration-500"
                  onMouseMove={() =>
                    setShowNavChildren(link.children ? true : false)
                  }
                  ref={link.children ? ref : null}
                >
                  {link.link ? (
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "text-[#1eb2a6] py-2 px-4 rounded-sm bg-white text-center inline-block"
                          : "text-[#134d48] md:hover:text-[#1eb2a6] text-center inline-block"
                      }
                      to={link.link}
                    >
                      {link.name}
                    </NavLink>
                  ) : (
                    <span className="flex items-center">
                      {link.name}
                      <MdKeyboardArrowDown className="text-[#134d48] text-14" />
                    </span>
                  )}
                </li>
              ))}
              {links.map((link) =>
                link.children
                  ? link.children.map((children, index) => (
                      <li
                        key={index}
                        className="text-[#134d48] font-[500] cursor-pointer hover:opacity-70 md:hover:text-[#1eb2a6] transition duration-500 block md:hidden"
                      >
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#1eb2a6] py-2 px-4 rounded-sm bg-white"
                              : "text-[#134d48] md:hover:text-[#1eb2a6]"
                          }
                          to={children.link}
                        >
                          {children.name}
                        </NavLink>
                      </li>
                    ))
                  : null
              )}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="start md:ml-10 bg-inherit lg:bg-[#edf6f533] md:bg-transparent">
              <div className="md:ml-[20px] float-right flex flex-wrap">
                {auth?.user ? (
                  <>
                    <div
                      className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                      onClick={() => setShowNavProfile(!showNavProfile)}
                    >
                      <img
                        className="h-8 w-8 rounded-full"
                        src={
                          auth?.user?.image ||
                          "https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg"
                        }
                        alt=""
                      />
                      <p>
                        <span className="text-[#134d48] md:text-gray-400 text-14">
                          Hi,
                        </span>{" "}
                        <span className="md:text-[#1eb2a6] font-bold ml-1 text-14">
                          {auth?.user?.name?.split(" ")?.pop()}
                        </span>
                      </p>
                      <MdKeyboardArrowDown className="text-gray-400 text-14" />
                    </div>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <button
                        type="button"
                        className="text-white py-2 px-3 rounded-sm border-[2px] 
                    border-white bg-[#1eb2a6] mr-4 hover:bg-white hover:text-[#1eb2a6] hover:border-[#1eb2a6]"
                      >
                        Đăng nhập
                      </button>
                    </Link>
                    <Link to={"/register"}>
                      <button
                        type="button"
                        className="text-white md:text-[#1eb2a6] py-2 px-4 rounded-sm border-[2px] 
                    border-white md:border-[#1eb2a6] bg-transparent hover:bg-[#1eb2a6] hover:text-white hover:border-white"
                      >
                        Đăng kí
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <UserProfile
              showNavProfile={showNavProfile}
              setShowNavProfile={setShowNavProfile}
              logout={logout}
              userData={auth?.user}
            />
            <button className="toggle chi" onClick={() => setClick(!click)}>
              {click ? (
                <i className="fa fa-times chi-w-[10px]"> </i>
              ) : (
                <i className="fa fa-bars"></i>
              )}
            </button>
          </div>
          {showNavChildren ? (
            <div
              className="absolute z-[110] hidden md:flex bg-white/50 h-[50px] bottom-[-56px] w-full items-center pl-10 gap-x-6"
              onMouseLeave={() => setShowNavChildren(false)}
            >
              <span className="pesudo-children" ref={refChildren}></span>
              {links.map((link) =>
                link.children
                  ? link.children.map((children, index) => (
                      <span
                        key={index}
                        className="text-[#134d48] font-[500] cursor-pointer hover:text-[#1eb2a6] transition duration-500"
                      >
                        <NavLink
                          className={({ isActive }) =>
                            isActive
                              ? "text-[#1eb2a6] py-2 px-4 rounded-sm bg-white"
                              : "text-[#134d48] hover:text-[#1eb2a6]"
                          }
                          to={children.link}
                        >
                          {children.name}
                        </NavLink>
                      </span>
                    ))
                  : null
              )}
            </div>
          ) : null}
        </nav>
      </header>
    </>
  );
};

export default Header;
