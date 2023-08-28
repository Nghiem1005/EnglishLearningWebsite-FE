import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";

const Home = React.lazy(() => import("../pages/home/Home"));
const Team = React.lazy(() => import("../pages/team/Team"));
const Contact = React.lazy(() => import("../pages/contact/Contact"));
const Blog = React.lazy(() => import("../pages/blog/Blog"));
const Pricing = React.lazy(() => import("../pages/pricing/Pricing"));
const About = React.lazy(() => import("../pages/about/About"));
const UserCourseContainer = React.lazy(() =>
  import("../pages/user-courses/UserCourseContainer")
);
const Login = React.lazy(() => import("../pages/login/Login"));
const Register = React.lazy(() => import("../pages/register/Register"));
const Learning = React.lazy(() =>
  import("../pages/user-courses/list-courses-learning/Learning")
);
const ListCoursesLiked = React.lazy(() =>
  import("../pages/user-courses/list-courses-liked/ListCoursesLiked")
);
const EditProfile = React.lazy(() => import("../pages/user-edit/EditProfile"));
const EditImage = React.lazy(() => import("../pages/user-edit/EditImage"));
const AccountSecurity = React.lazy(() =>
  import("../pages/user-edit/AccountSecurity")
);
const CloseAccount = React.lazy(() =>
  import("../pages/user-edit/CloseAccount")
);
const UserEditContainer = React.lazy(() =>
  import("../pages/user-edit/UserEditContainer")
);
const ManageSubscription = React.lazy(() =>
  import("../pages/user-edit/ManageSubscription")
);
const CoursesPage = React.lazy(() =>
  import("../pages/courses/courses-list/CoursesPage")
);

const CourseDetail = React.lazy(() =>
  import("../pages/courses/course-detail/CourseDetail")
);

const CourseStudying = React.lazy(() =>
  import("../pages/courses/course-studying/CourseStudying")
);
const PurchaseHistory = React.lazy(() =>
  import("../pages/user-courses/purchase-history/PurchaseHistory")
);

// User Blog
const ListBlog = React.lazy(() =>
  import("../pages/user-blog/blog-list/ListBlog")
);
const ListBlogByUser = React.lazy(() =>
  import("../pages/user-blog/bog-list-by-user/ListBlogByUser")
);
const EditBlog = React.lazy(() =>
  import("../pages/user-blog/edit-blog/EditBlog")
);
const UserWriteBlog = React.lazy(() =>
  import("../pages/user-blog/write-blog/WriteBlog")
);
const BlogDetail = React.lazy(() =>
  import("../pages/user-blog/blog-detail/BlogDetail")
);
const BlogDetailByUser = React.lazy(() =>
  import("../pages/user-blog/blog-detail-by-user/BlogDetailByUser")
);

// User Flashcard
const FlashCard = React.lazy(() =>
  import("../pages/user-flashcard/FlashcardList")
);
const ListWordByFlashCard = React.lazy(() =>
  import("../pages/user-flashcard/list-words/ListWords")
);
const LearWordsByFlashcard = React.lazy(() =>
  import("../pages/user-flashcard/learn-words/LearningWord")
);


// User Test
const HistoryTest = React.lazy(() =>
  import("../pages/user-test/history-test/HistoryTest")
);
const ChooseTest = React.lazy(() =>
  import("../pages/user-test/choose-test/ChooseTest")
);
const WorkTest = React.lazy(() =>
  import("../pages/user-test/work-test/WorkTest")
);
const StatisticTest = React.lazy(() =>
  import("../pages/user-test/statistic-test/StatisticTest")
);
const DetailTest = React.lazy(() =>
  import("../pages/user-test/detail-test/DetailTest")
);

// Teacher
const DetailTeacher = React.lazy(() =>
  import("../pages/team/TeacherDetail")
);

const UnRequiredAuth = React.lazy(() => import("../utils/UnRequiredAuth"));
const RequiredAuth = React.lazy(() => import("../utils/RequiredAuth"));

const RoutingModule = () => {
  const authRoute = [
    {
      path: "/login",
      element: (
        <Suspense fallback={null}>
          <UnRequiredAuth>
            <Login />
          </UnRequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={null}>
          <UnRequiredAuth>
            <Register />
          </UnRequiredAuth>
        </Suspense>
      ),
    },
  ];

  const userRoute = [
    {
      path: "/home",
      children: [
        {
          path: "my-courses",
          element: (
            <Suspense fallback={null}>
              <RequiredAuth>
                <UserCourseContainer />
              </RequiredAuth>
            </Suspense>
          ),
          children: [
            {
              path: "learning",
              element: (
                <Suspense fallback={null}>
                  <RequiredAuth>
                    <Learning />
                  </RequiredAuth>
                </Suspense>
              ),
            },
            {
              path: "favorite",
              element: (
                <Suspense fallback={null}>
                  <RequiredAuth>
                    <ListCoursesLiked />
                  </RequiredAuth>
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/my-course/course/:courseId/learn/lecture/:lectureId",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <CourseStudying />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user/purchase-history",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <PurchaseHistory />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <UserEditContainer />
          </RequiredAuth>
        </Suspense>
      ),
      children: [
        {
          path: "edit-profile",
          element: (
            <Suspense fallback={null}>
              <RequiredAuth>
                <EditProfile />
              </RequiredAuth>
            </Suspense>
          ),
        },
        {
          path: "edit-photo",
          element: (
            <Suspense fallback={null}>
              <RequiredAuth>
                <EditImage />
              </RequiredAuth>
            </Suspense>
          ),
        },
        {
          path: "edit-account",
          element: (
            <Suspense fallback={null}>
              <RequiredAuth>
                <AccountSecurity />
              </RequiredAuth>
            </Suspense>
          ),
        },
        {
          path: "manage-subscriptions",
          element: (
            <Suspense fallback={null}>
              <RequiredAuth>
                <ManageSubscription />
              </RequiredAuth>
            </Suspense>
          ),
        },
        {
          path: "close-account",
          element: (
            <Suspense fallback={null}>
              <RequiredAuth>
                <CloseAccount />
              </RequiredAuth>
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "flashcard",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <FlashCard />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "flashcard/list/:flashcardId",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <ListWordByFlashCard />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "flashcard/list/:flashcardId/review",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <LearWordsByFlashcard />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user-blog/write-blog",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <UserWriteBlog />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user-blog/list",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <ListBlog />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user-blog/user/:userId/blog/list",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <ListBlogByUser />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user-blog/user/:userId/blog/:blogId/edit",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <EditBlog />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user-blog/blog/:blogId",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <BlogDetail />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "user-blog/user/:userId/blog/:blogId",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <BlogDetailByUser />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "test/history",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <HistoryTest />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "test/:testId/statistic",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <StatisticTest />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "test/:testId/work",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <WorkTest />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "test/choose",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <ChooseTest />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "test/:testId/detail",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <DetailTest />
          </RequiredAuth>
        </Suspense>
      ),
    },
  ];

  const courseRoute = [
    {
      path: "/courses",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <CoursesPage />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/course/:courseId",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <CourseDetail />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/:courseId/lecture/:lectureId",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <CourseStudying />
          </RequiredAuth>
        </Suspense>
      ),
    },

    {
      path: "/team/teacher/:teacherId",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <DetailTeacher />
          </RequiredAuth>
        </Suspense>
      ),
    },
  ];

  const route = [
    {
      path: "/",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <Home />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/about",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <About />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/team",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <Team />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/pricing",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <Pricing />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/blog",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <Blog />
          </RequiredAuth>
        </Suspense>
      ),
    },
    {
      path: "/contact",
      element: (
        <Suspense fallback={null}>
          <RequiredAuth>
            <Contact />
          </RequiredAuth>
        </Suspense>
      ),
    },
    ...authRoute,
    ...userRoute,
    ...courseRoute,
  ];
  return useRoutes(route);
};

export default RoutingModule;
