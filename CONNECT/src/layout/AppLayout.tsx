import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <p>Nav Bar</p>
      <Outlet />
    </div>
  );
};
export default AppLayout;
