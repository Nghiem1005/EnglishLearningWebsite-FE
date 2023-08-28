import { useRoutes } from "react-router-dom";
import React, { Suspense } from "react";
import UnRequiredAuth from "../utils/UnRequiredAuth";
import RequiredAuth from "../utils/RequiredAuth";
import {
  AccountSecurity,
  CloseAccount,
  CourseList,
  CreateCourse,
  CreateLesson,
  CreatePractice,
  EditCourse,
  EditImage,
  EditProfile,
  Home,
  Kanban,
  LessonEdit,
  LessonList,
  Login,
  PracticeEdit,
  ProfilePublic,
  StudentList,
  UserEditContainer,
} from "../pages";

// Edit Description
const EditDescription = React.lazy(() =>
  import("../pages/user-edit/EditDescription")
);

// Test
const TestList = React.lazy(() => import("../pages/Tests/TestList"));
const CreateTest = React.lazy(() =>
  import("../pages/Tests/CreateTest/CreateTest")
);
const EditTest = React.lazy(() => import("../pages/Tests/EditTest/EditExam"));

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
          path: "edit-description",
          element: (
            <Suspense fallback="">
              <RequiredAuth>
                <EditDescription />
              </RequiredAuth>
            </Suspense>
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
    // {
    //   path: "/home",
    //   element: (
    //     <RequiredAuth>
    //       <Home />
    //     </RequiredAuth>
    //   ),
    // },
    {
      path: "/",
      element: (
        <RequiredAuth>
          <CourseList />
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

    {
      path: "/lesson/:lessonId/practice/:testId/edit",
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
    {
      path: "/test",
      element: (
        <Suspense fallback="">
          <RequiredAuth>
            <TestList />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/test/:testId/edit",
      element: (
        <Suspense fallback="">
          <RequiredAuth>
            <EditTest />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/test/create",
      element: (
        <Suspense fallback="">
          <RequiredAuth>
            <CreateTest />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/kanban",
      element: (
        <RequiredAuth>
          <Kanban />
        </RequiredAuth>
      ),
    },
    ...userRoute,
    ...authRoute,
  ];

  return useRoutes(route);
};

export default RoutingModule;
