import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";
import UnRequiredAuth from "../utils/UnRequiredAuth";
import RequiredAuth from "../utils/RequiredAuth";
import {
  AccountSecurity,
  BillList,
  CloseAccount,
  CourseList,
  CreateCourse,
  CreateLesson,
  CreatePractice,
  CreateStudent,
  CreateTeacher,
  EditCourse,
  EditImage,
  EditProfile,
  EditStudent,
  EditTeacher,
  FormRegister,
  Home,
  LessonEdit,
  LessonList,
  Login,
  PracticeEdit,
  ProfilePublic,
  StudentList,
  TeacherList,
  UserEditContainer,
} from "../pages";

const MessageSupport = React.lazy(() =>
  import("../pages/message-support/MessageSupport")
);
const DiscountList = React.lazy(() => import("../pages/Discount/DiscountList"));
const EditDiscount = React.lazy(() => import("../pages/Discount/EditDiscount/EditDiscount"));

const FeedbackCourseList = React.lazy(() =>
  import("../pages/FeedbackCourse/FeedbackCourseList")
);

const RoutingModule = () => {
  const authRoute = [
    {
      path: "/login",
      element: (
        <UnRequiredAuth>
          <Login />
        </UnRequiredAuth>
      ),
    },
    {
      path: "/form-register",
      element: <FormRegister />,
    },
  ];

  const userRoute = [
    {
      path: "profile",
      element: (
        <RequiredAuth>
          <UserEditContainer />
        </RequiredAuth>
      ),
      children: [
        {
          path: "public",
          element: (
            <RequiredAuth>
              <ProfilePublic />
            </RequiredAuth>
          ),
        },
        {
          path: "edit-profile",
          element: (
            <RequiredAuth>
              <EditProfile />
            </RequiredAuth>
          ),
        },
        {
          path: "edit-photo",
          element: (
            <RequiredAuth>
              <EditImage />
            </RequiredAuth>
          ),
        },
        {
          path: "edit-account",
          element: (
            <RequiredAuth>
              <AccountSecurity />
            </RequiredAuth>
          ),
        },
        {
          path: "close-account",
          element: (
            <RequiredAuth>
              <CloseAccount />
            </RequiredAuth>
          ),
        },
      ],
    },
  ];

  const route = [
    {
      path: "/home",
      element: (
        <RequiredAuth>
          <Home />
        </RequiredAuth>
      ),
    },
    {
      path: "/",
      element: (
        <RequiredAuth>
          <Home />
        </RequiredAuth>
      ),
    },

    // Course
    {
      path: "/course",
      element: (
        <RequiredAuth>
          <CourseList />
        </RequiredAuth>
      ),
    },
    {
      path: "/course/:courseId/edit",
      element: (
        <RequiredAuth>
          <EditCourse />
        </RequiredAuth>
      ),
    },
    {
      path: "/course/create",
      element: (
        <RequiredAuth>
          <CreateCourse />
        </RequiredAuth>
      ),
    },

    // Teacher
    {
      path: "/teacher",
      element: (
        <RequiredAuth>
          <TeacherList />
        </RequiredAuth>
      ),
    },
    {
      path: "/teacher/:teacherId/edit",
      element: (
        <RequiredAuth>
          <EditTeacher />
        </RequiredAuth>
      ),
    },
    {
      path: "/teacher/create",
      element: (
        <RequiredAuth>
          <CreateTeacher />
        </RequiredAuth>
      ),
    },
    // Student
    // Lesson & Practice
    {
      path: "/lesson/:lessonId/practice/:examId/edit",
      element: (
        <RequiredAuth>
          <PracticeEdit />
        </RequiredAuth>
      ),
    },
    {
      path: "/student",
      element: (
        <RequiredAuth>
          <StudentList />
        </RequiredAuth>
      ),
    },
    {
      path: "/student/:studentId/edit",
      element: (
        <RequiredAuth>
          <EditStudent />
        </RequiredAuth>
      ),
    },
    {
      path: "/student/create",
      element: (
        <RequiredAuth>
          <CreateStudent />
        </RequiredAuth>
      ),
    },
    {
      path: "/lesson",
      element: (
        <RequiredAuth>
          <LessonList />
        </RequiredAuth>
      ),
    },
    {
      path: "/lesson/:lessonId/edit",
      element: (
        <RequiredAuth>
          <LessonEdit />
        </RequiredAuth>
      ),
    },
    {
      path: "/lesson/create",
      element: (
        <RequiredAuth>
          <CreateLesson />
        </RequiredAuth>
      ),
    },
    {
      path: "/lesson/:lessonId/practice/create",
      element: (
        <RequiredAuth>
          <CreatePractice />
        </RequiredAuth>
      ),
    },

    // Discount
    {
      path: "/discount/*",
      element: (
        <Suspense fallback=''>
          <RequiredAuth>
            <DiscountList />
          </RequiredAuth>
        </Suspense>
      ),
    },

    // FeedbackCourse
    {
      path: "/feedback-course",
      element: (
        <Suspense fallback=''>
          <RequiredAuth>
            <FeedbackCourseList />
          </RequiredAuth>
        </Suspense>
      ),
    },
    
    // Bills
    {
      path: "/bills",
      element: (
        <RequiredAuth>
          <BillList />
        </RequiredAuth>
      ),
    },

    // Message Support
    {
      path: "/message-support/*",
      element: (
        <Suspense fallback="">
          <RequiredAuth>
            <MessageSupport />
          </RequiredAuth>
        </Suspense>
      ),
    },
    ...userRoute,
    ...authRoute,
  ];

  return useRoutes(route);
};

export default RoutingModule;
