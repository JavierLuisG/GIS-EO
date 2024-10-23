import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ aoi, redirectPath = "/" }) => {
  return aoi !== "" ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoutes;