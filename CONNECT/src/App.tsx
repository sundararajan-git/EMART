import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./components/shadcn/theme-provider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getJWT, showErrorToast } from "./lib/utils";
import type { ErrorToastType } from "./types/types";
import axiosInstance from "./lib/axios/axios";
import { setUser, clearUser, setAuthLoading } from "./store/slices/userSlice";
import type { RootState } from "./store/store";
import AuthGuard from "./guards/AuthGuard";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./pages/auth/signup/SignUp";
import Login from "./pages/auth/login/Login";
import EmailVerify from "./pages/auth/verify/EmailVerify";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import NotFound from "./pages/404/NotFound";
import HomePage from "./pages/home/HomePage";
import StatusPage from "./pages/status/StatusPage";
import FavouritsPage from "./pages/favourits/FavouritsPage";
import ContactPage from "./pages/contact/ContactPage";
import NotificationPage from "./pages/notification/NotificationPage";
import Spinner from "./components/app/Spinner";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { authLoading } = useSelector((state: RootState) => state.user);

  const validUser = async () => {
    try {
      dispatch(setAuthLoading(true));
      const token = getJWT();
      if (token) {
        const { data } = await axiosInstance.get("/auth/valid-user");

        switch (data.status) {
          case "USER EXITS":
            dispatch(setUser({ value: data.user }));
            break;
          default:
            dispatch(clearUser());
            console.warn("Unhandled status:", data.status);
        }
      } else {
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(clearUser());
      showErrorToast(err as ErrorToastType);
    } finally {
      dispatch(setAuthLoading(false));
    }
  };

  useEffect(() => {
    validUser();
  }, [dispatch]);

  if (authLoading) {
    return (
      <div className="w-full h-screen">
        <Spinner isLoadingText={true} />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chats" element={<HomePage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/favourits" element={<FavouritsPage />} />
            <Route path="/contacts" element={<ContactPage />} />
            <Route path="/notification" element={<NotificationPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify/:token" element={<EmailVerify />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: theme === "dark" ? "#030712" : "#fff",
            color: theme === "dark" ? "#fff" : "#000",
            padding: "10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </>
  );
};

export default App;
