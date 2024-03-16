import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardRouter = () => {
  const { user } = useAuth();

  if (user.status === "organizer") {
    return <Navigate to="/dashboard/manage-camps" replace={true} />;
  } else if (user.status === "professional") {
    return <Navigate to="/dashboard/professional-profile" replace={true} />;
  } else {
    return <Navigate to="/dashboard/registered-camps" replace={true} />;
  }
};

export default DashboardRouter;
