import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import OnBoardingPage from "./auth/OnBoardingPage"

import HomePage from "./pages/HomePage";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuth = Boolean(authUser);
  const isOnboarding = authUser?.isOnboarding;

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
          path="/onboarding"
          element={
            isAuth && !isOnboarding ? (
              <OnBoardingPage />
            ) : (
              <Navigate to={isAuth ? "/" : "/login"} />
            )
          }
        />

        <Route
          path="/"
          element={
            isAuth && isOnboarding ? (
              <HomePage />
            ) : (
              <Navigate to={!isAuth ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
