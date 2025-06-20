import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import CompleteRegistrationPage from "./auth/CompleteRegistrationPage"

import HomePage from "./pages/HomePage";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuth = Boolean(authUser);
  const isCompleteRegistration = authUser?.isCompleteRegistration;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route
          path="/login"
          element={!isAuth ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuth ? <RegisterPage /> : <Navigate to="/" />}
        />

        <Route
          path="/complete-registration"
          element={
            isAuth && !isCompleteRegistration ? (
              <CompleteRegistrationPage />
            ) : (
              <Navigate to={isAuth ? "/" : "/login"} />
            )
          }
        />

        <Route
          path="/"
          element={
            isAuth && isCompleteRegistration ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuth ? "/login" : "/isCompleteRegistration"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
