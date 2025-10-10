import Spinner from "@/components/app/Spinner";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { matchPath, Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGuard = () => {
  const { isVerified, authLoading } = useSelector(
    (state: RootState) => state.user
  );
  const location = useLocation();

  const publicRoutes = [
    "/signup",
    "/login",
    "/verify/:token",
    "/forgot-password",
    "/reset-password/:token",
  ];

  const isPublic = publicRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  if (authLoading) {
    return (
      <div className="w-full h-screen">
        <Spinner isLoadingText={true} />
      </div>
    );
  }

  if (!isPublic && !isVerified) {
    return <Navigate to="/login" replace />;
  }

  if (isPublic && isVerified) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
