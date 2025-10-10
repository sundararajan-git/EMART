import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import EmailVerify from "./pages/verify/EmailVerify";
import Home from "./pages/home/Home";
import ProductsList from "./pages/products/ProductsList";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/cart/Cart";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import AuthGuard from "./guards/AuthGuard";
import AppLayout from "./layout/AppLayout";
import AuthLayout from "./layout/AuthLayout";
import "./App.css";
import NotFound from "./pages/404/NotFound";
import { Toaster } from "react-hot-toast";
import { useTheme } from "./components/shadcn/theme-provider";
import { useEffect } from "react";
import { getJWT, showErrorToast } from "./lib/utils";
import type { ErrorToastType } from "./types/types";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import axiosInstance from "./lib/axios/axios";

const App = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const validUser = async () => {
    try {
      const token = getJWT();
      if (token) {
        const { data } = await axiosInstance.get("/auth/valid-user");
        switch (data.status) {
          case "USER EXITS":
            dispatch(setUser({ value: data.user }));
            break;
          default:
            console.warn("Unhandled status:", data.status);
        }
      }
    } catch (err) {
      // localStorage.removeItem("jwt");
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
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<ProductsList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
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
