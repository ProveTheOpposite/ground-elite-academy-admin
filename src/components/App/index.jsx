// hook
import { useRecoilState } from "recoil";
// hooks perso
import useAuthState from "src/hooks/useAuthState";
// react router dom
import { Route, Routes } from "react-router-dom";
// atom
import { isAdminState } from "src/recoil";
// components
import CoursesForm from "src/pages/Admin/pages/Courses/components/CoursesForm";
import OverviewCourses from "src/pages/Admin/pages/Courses/components/OverviewCourses";
import Home from "src/pages/Home";
import Login from "src/pages/Login";
import ErrorElement from "../../pages/ErrorElement";
import Footer from "../Footer";
import Header from "../Header";
import ProtectedRoute from "../ProtectedRoute";
import ScrollToTop from "../ScrollToTop";
import SideBar from "../SideBar";

const protectedRoutes = [
  { path: "/", element: <Home /> },
  { path: "/admin/courses/add-course", element: <CoursesForm /> },
  { path: "/admin/courses/edit/:courseId", element: <CoursesForm /> },
  { path: "/admin/courses/overview", element: <OverviewCourses /> },
];

const App = () => {
  // state to know if login or not
  const [isAdmin, setIsAdmin] = useRecoilState(isAdminState);

  useAuthState(setIsAdmin);

  return (
    <div>
      {!isAdmin ? (
        <div className="min-h-screen bg-blue-400">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorElement />} />
          </Routes>
        </div>
      ) : (
        <div className="flex min-h-screen flex-col">
          <Header />

          <ScrollToTop />

          <main className="flex flex-1 flex-col lg:flex-row">
            <SideBar />

            <Routes>
              {protectedRoutes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={<ProtectedRoute>{element}</ProtectedRoute>}
                />
              ))}

              <Route path="*" element={<ErrorElement />} />
            </Routes>
          </main>

          {/* <Footer /> */}
        </div>
      )}
    </div>
  );
};

export default App;
