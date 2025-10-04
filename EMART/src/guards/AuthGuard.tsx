import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, matchPath } from "react-router-dom";

const AuthGuard = () => {
  const { isVerified } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  const publicRoutes = [
    "/signup",
    "/login",
    "/verify",
    "/forgot-password",
    "/reset-password/:token",
  ];

  const isPublic = publicRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  if (isVerified && isPublic) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthGuard;
