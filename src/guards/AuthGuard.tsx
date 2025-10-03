import { Navigate, Outlet, useLocation, matchPath } from "react-router-dom";

const AuthGuard = () => {
  const auth = { email: "ee", isLogin: true };
  const location = useLocation();

  const publicRoutes = [
    "/signup",
    "/login",
    "/verify",
    "/forgot-password",
    "/reset-password/:token",
  ];

  const userLogedIn = auth?.email && auth.isLogin;

  // check if current path matches any public route
  const isPublic = publicRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  if (userLogedIn && isPublic) {
    return <Navigate to="/" replace />;
  }

  if (!userLogedIn && !isPublic) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
