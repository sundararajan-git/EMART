import { Toaster } from "react-hot-toast";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useTheme } from "./components/shadcn/theme-provider";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { showErrorToast } from "./lib/utils";
import type { ErrorToastType } from "./types/types";
import axiosInstance from "./lib/axios/axios";
import { setUser } from "./store/slices/userSlice";
import AuthGuard from "./guards/AuthGuard";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import EmailVerify from "./pages/verify/EmailVerify";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import NotFound from "./pages/404/NotFound";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const validUser = async () => {
    try {
      const jwtString = localStorage.getItem("jwt");
      const token = JSON.parse(jwtString ?? "");
      if (token) {
        const { data } = await axiosInstance.get("/auth/valid-user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        switch (data.status) {
          case "USER EXITS":
            dispatch(setUser({ value: data.user }));
            break;
          default:
            break;
        }
      }
    } catch (err) {
      localStorage.removeItem("jwt");
      showErrorToast(err as ErrorToastType);
    }
  };

  useEffect(() => {
    validUser();
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<p>Home</p>} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify" element={<EmailVerify />} />
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
            padding: "10px 20px 10px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          },
        }}
      />
    </>
  );
};

export default App;
