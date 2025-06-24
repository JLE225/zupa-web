import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout";

import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import CompleteRegistrationPage from "./auth/CompleteRegistrationPage";

import HomePage from "./pages/HomePage";
import PageLoader from "./components/PageLoader";
import useAuthUser from "./hooks/useAuthUser";
import NotificationsPage from "./pages/NotificationsPage";
import MessagesPage from "./pages/MessagesPage";
import ChatList from "./pages/ChatList";
import ChatPlaceholder from "./components/ChatPlaceholder";

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
          element={
            !isAuth ? (
              <LoginPage />
            ) : (
              <Navigate
                to={isCompleteRegistration ? "/" : "/complete-registration"}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuth ? (
              <RegisterPage />
            ) : (
              <Navigate
                to={isCompleteRegistration ? "/" : "/complete-registration"}
              />
            )
          }
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
              <Layout>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuth ? "/login" : "/complete-registration"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuth && isCompleteRegistration ? (
              <Layout>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuth ? "/login" : "/complete-registration"} />
            )
          }
        />
        <Route
          path="/messages"
          element={
            isAuth && isCompleteRegistration ? (
              <Layout>
                <ChatList />
              </Layout>
            ) : (
              <Navigate to={!isAuth ? "/login" : "/complete-registration"} />
            )
          }
        >
          <Route index element={<ChatPlaceholder />} />
          <Route path=":id" element={<MessagesPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
