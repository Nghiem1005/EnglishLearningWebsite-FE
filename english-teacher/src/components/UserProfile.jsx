import React from 'react';
import { BsFillFileEarmarkPersonFill } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';

const userProfileData = [
  {
    icon: <BsFillFileEarmarkPersonFill />,
    link: 'profile/edit-profile',
    title: 'Hồ sơ',
    desc: 'Cài đặt',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  // {
  //   icon: <BsShield />,
  //   title: 'My Inbox',
  //   desc: 'Messages & Emails',
  //   iconColor: 'rgb(0, 194, 146)',
  //   iconBg: 'rgb(235, 250, 242)',
  // },
  // {
  //   icon: <FiCreditCard />,
  //   title: 'My Tasks',
  //   desc: 'To-do and Daily Tasks',
  //   iconColor: 'rgb(255, 244, 229)',
  //   iconBg: 'rgb(254, 201, 15)',
  // },
];

const UserProfile = ({ handleLogout, handleClick, dataUser }) => {
  const { currentColor } = useStateContext();

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Thông tin người dùng</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={dataUser?.image || avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {dataUser?.name} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Giáo viên   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {dataUser.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <Link to={item?.link} onClick={() => handleClick('none')}>
            <div key={index} className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
      <div className="mt-5" onClick={handleLogout}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Đăng xuất"
          borderRadius="10px"
          width="full"
        />
      </div>
    </div>

  );
};

export default UserProfile;
