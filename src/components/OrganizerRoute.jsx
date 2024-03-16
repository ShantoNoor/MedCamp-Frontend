import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

const OrganizerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { pathname, state } = useLocation();

  if (loading) return <Spinner />;
  if (user && user.status === "organizer") return children;
  return (
    <Navigate to="/sign-in" state={{ ...state, pathname }} replace={true} />
  );
};

export default OrganizerRoute;
