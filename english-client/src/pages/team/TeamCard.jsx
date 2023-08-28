import React from "react";
import { useQueryCustom } from "../../hooks";
import { thunkTeacherTypes } from "../../constants/thunkTypes";
import { userService } from "../../services/user";
import { Link } from "react-router-dom";

const TeamCard = () => {
  const { data, isLoading, isError } = useQueryCustom(
    thunkTeacherTypes.GETALL_TEACHER,
    userService.getAllTeacher
  );

  if (isLoading || isError) return;
  return (
    <>
      {data?.map((teacher) => (
        <div className="items shadow" key={teacher?.id}>
          <div className="img">
            <img
              className="h-[300px] object-cover"
              src={
                teacher?.image ||
                "https://st2.depositphotos.com/1518767/8470/i/950/depositphotos_84700542-stock-photo-teacher-smiling-at-camera-in.jpg"
              }
              alt=""
            />
            <div className="overlay">
              <i className="fab fa-facebook-f icon"></i>
              <i className="fab fa-twitter icon"></i>
              <i className="fab fa-instagram icon"></i>
              <i className="fab fa-tiktok icon"></i>
            </div>
          </div>
          <Link to={`teacher/${teacher?.id}`}>
            <div className="details">
              <h2>{teacher.name}</h2>
              <p>{teacher.role}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default TeamCard;
