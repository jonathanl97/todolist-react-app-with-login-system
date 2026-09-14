import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user.signedIn === null) {
    return <div></div>;
  }

  return user.signedIn ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
};

export default PrivateRoutes;
